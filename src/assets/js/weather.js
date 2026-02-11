(() => {
    const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';
    const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/reverse';
    const FALLBACK = { latitude: 13.7563, longitude: 100.5018, city: 'Bangkok' };

    const dateEl = document.getElementById('weather-date');
    const cityEl = document.getElementById('weather-city');
    const tempEl = document.getElementById('weather-temp');
    const conditionEl = document.getElementById('weather-condition');
    const stateEl = document.getElementById('weather-state');
    const forecastEl = document.getElementById('weather-forecast');

    if (!dateEl || !cityEl || !tempEl || !conditionEl || !stateEl || !forecastEl) return;

    function setDateLabel() {
        dateEl.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    function weatherLabel(code) {
        if (code === 0) return 'Clear';
        if ([1, 2, 3].includes(code)) return 'Cloudy';
        if ([45, 48].includes(code)) return 'Mist';
        if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
        if ([95, 96, 99].includes(code)) return 'Thunderstorm';
        return 'Variable';
    }

    function bgClass(code, isDay) {
        if (code === 0 && isDay === 1) return 'bg-clear-day';
        if (code === 0 && isDay === 0) return 'bg-clear-night';
        if ([1, 2, 3].includes(code)) return 'bg-cloudy';
        if ([45, 48].includes(code)) return 'bg-mist';
        if ([95, 96, 99].includes(code)) return 'bg-storm';
        if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'bg-rain';
        return 'bg-cloudy';
    }

    function applyBodyBackground(className) {
        const classes = ['bg-clear-day', 'bg-clear-night', 'bg-cloudy', 'bg-rain', 'bg-storm', 'bg-mist'];
        document.body.classList.remove(...classes);
        document.body.classList.add(className);
        document.body.classList.add('weather-ready');
    }

    function renderForecast(days) {
        forecastEl.innerHTML = days
            .slice(0, 7)
            .map((day, i) => {
                const date = new Date(day.date).toLocaleDateString('en-US', { weekday: i === 0 ? 'short' : 'short' });
                return `
                    <div class="forecast-day">
                        <p>${date}</p>
                        <p>${Math.round(day.max)}° / ${Math.round(day.min)}°</p>
                        <p>${weatherLabel(day.code)}</p>
                    </div>
                `;
            })
            .join('');
    }

    async function reverseGeocode(lat, lon) {
        try {
            const params = new URLSearchParams({ latitude: lat, longitude: lon, language: 'en', count: '1' });
            const response = await fetch(`${GEOCODE_URL}?${params.toString()}`);
            if (!response.ok) return FALLBACK.city;
            const data = await response.json();
            return data?.results?.[0]?.name || FALLBACK.city;
        } catch {
            return FALLBACK.city;
        }
    }

    async function fetchWeather(lat, lon) {
        const params = new URLSearchParams({
            latitude: String(lat),
            longitude: String(lon),
            current: 'temperature_2m,weather_code,is_day',
            daily: 'weather_code,temperature_2m_max,temperature_2m_min',
            timezone: 'auto',
            forecast_days: '7'
        });

        const response = await fetch(`${WEATHER_URL}?${params.toString()}`);
        if (!response.ok) throw new Error('Weather API unavailable');
        return response.json();
    }

    async function loadWeather(latitude, longitude) {
        stateEl.textContent = 'Loading weather data...';

        const [weather, city] = await Promise.all([
            fetchWeather(latitude, longitude),
            reverseGeocode(latitude, longitude)
        ]);

        cityEl.textContent = city;
        tempEl.textContent = `${Math.round(weather.current.temperature_2m)}°C`;
        conditionEl.textContent = weatherLabel(weather.current.weather_code);

        const days = weather.daily.time.map((date, idx) => ({
            date,
            max: weather.daily.temperature_2m_max[idx],
            min: weather.daily.temperature_2m_min[idx],
            code: weather.daily.weather_code[idx]
        }));

        renderForecast(days);
        applyBodyBackground(bgClass(weather.current.weather_code, weather.current.is_day));
        stateEl.textContent = 'Weather updated.';
    }

    function getLocation() {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                stateEl.textContent = 'Location unavailable. Using Bangkok.';
                resolve(FALLBACK);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        city: 'Your location'
                    });
                },
                () => { stateEl.textContent = 'Location denied. Using Bangkok.'; resolve(FALLBACK); },
                { timeout: 5000 }
            );
        });
    }

    async function init() {
        setDateLabel();
        try {
            const location = await getLocation();
            await loadWeather(location.latitude, location.longitude);
        } catch (error) {
            console.error(error);
            cityEl.textContent = FALLBACK.city;
            tempEl.textContent = '--°C';
            conditionEl.textContent = 'Unavailable';
            stateEl.textContent = 'Unable to load weather data right now.';
            applyBodyBackground('bg-clear-night');
        }
    }

    init();
})();
