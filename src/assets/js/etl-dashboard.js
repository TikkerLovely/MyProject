(function () {
    const BANGKOK = {
        lat: 13.7563,
        lon: 100.5018
    };

    const statusEl = document.getElementById('etl-status');
    const kpiEl = document.getElementById('etl-kpis');
    const chartEl = document.getElementById('etl-chart');
    const tableBodyEl = document.getElementById('etl-table-body');

    if (!statusEl || !kpiEl || !chartEl || !tableBodyEl) {
        return;
    }

    async function runETL() {
        try {
            statusEl.textContent = 'Running ETL pipeline...';
            const raw = await extract();
            const transformed = transform(raw);
            load(transformed);
            statusEl.textContent = `ETL success • Last updated: ${new Date().toLocaleString()}`;
            statusEl.classList.add('success');
        } catch (error) {
            console.error('ETL pipeline failed:', error);
            statusEl.textContent = 'ETL failed: Unable to fetch live API data right now.';
            statusEl.classList.add('error');
        }
    }

    async function extract() {
        const params = new URLSearchParams({
            latitude: BANGKOK.lat,
            longitude: BANGKOK.lon,
            hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability',
            forecast_days: '2',
            timezone: 'Asia/Bangkok'
        });

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return response.json();
    }

    function transform(data) {
        const { time, temperature_2m, relative_humidity_2m, precipitation_probability } = data.hourly;
        const now = new Date();

        const rows = time
            .map((t, index) => ({
                timestamp: new Date(t),
                temp: Number(temperature_2m[index]),
                humidity: Number(relative_humidity_2m[index]),
                rain: Number(precipitation_probability[index])
            }))
            .filter((row) => row.timestamp >= now)
            .slice(0, 24);

        if (!rows.length) {
            throw new Error('No telemetry rows available for next 24 hours');
        }

        const avgTemp = average(rows.map((r) => r.temp));
        const avgHumidity = average(rows.map((r) => r.humidity));
        const avgRain = average(rows.map((r) => r.rain));
        const maxTemp = Math.max(...rows.map((r) => r.temp));
        const maxRain = Math.max(...rows.map((r) => r.rain));

        const reliabilityScore = Math.max(60, Math.round(100 - avgRain * 0.35 - Math.max(0, maxTemp - 34) * 3));

        return {
            rows,
            kpis: [
                { label: 'Avg Temp (24h)', value: `${avgTemp.toFixed(1)} °C` },
                { label: 'Avg Humidity', value: `${avgHumidity.toFixed(0)} %` },
                { label: 'Peak Rain Risk', value: `${maxRain.toFixed(0)} %` },
                { label: 'Ops Reliability', value: `${reliabilityScore} / 100` }
            ]
        };
    }

    function load(model) {
        renderKPIs(model.kpis);
        renderChart(model.rows);
        renderTable(model.rows.slice(0, 8));
    }

    function renderKPIs(kpis) {
        kpiEl.innerHTML = kpis
            .map(
                (kpi) => `
                <div class="etl-kpi-card">
                    <p class="etl-kpi-label">${kpi.label}</p>
                    <p class="etl-kpi-value">${kpi.value}</p>
                </div>
            `
            )
            .join('');
    }

    function renderChart(rows) {
        const minTemp = Math.min(...rows.map((r) => r.temp));
        const maxTemp = Math.max(...rows.map((r) => r.temp));
        const range = maxTemp - minTemp || 1;

        chartEl.innerHTML = rows
            .map((row, index) => {
                const barHeight = ((row.temp - minTemp) / range) * 100;
                const label = row.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return `
                    <div class="etl-bar-wrap" title="${label}: ${row.temp.toFixed(1)}°C">
                        <div class="etl-bar" style="height:${Math.max(8, barHeight)}%"></div>
                        ${index % 3 === 0 ? `<span class="etl-bar-label">${label}</span>` : '<span class="etl-bar-label"></span>'}
                    </div>
                `;
            })
            .join('');
    }

    function renderTable(rows) {
        tableBodyEl.innerHTML = rows
            .map((row) => {
                const timeLabel = row.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return `
                    <tr>
                        <td>${timeLabel}</td>
                        <td>${row.temp.toFixed(1)}</td>
                        <td>${row.humidity.toFixed(0)}</td>
                        <td>${row.rain.toFixed(0)}</td>
                    </tr>
                `;
            })
            .join('');
    }

    function average(values) {
        return values.reduce((sum, value) => sum + value, 0) / values.length;
    }

    runETL();
})();
