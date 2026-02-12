(() => {
    const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';
    const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/reverse';
    const FALLBACK = { latitude: 13.7563, longitude: 100.5018, city: 'Bangkok' };

    const WEATHER_BG = {
        'clear-day': "url('assets/weather/clear-day.jpg'), linear-gradient(155deg, #4f8ef7 0%, #2f68d9 40%, #10223d 100%)",
        'clear-night': "url('assets/weather/clear-night.jpg'), linear-gradient(160deg, #010714 0%, #0a1834 45%, #162a4d 100%)",
        cloudy: "url('assets/weather/cloudy.jpg'), linear-gradient(160deg, #425569 0%, #4f6276 40%, #263649 100%)",
        rain: "url('assets/weather/rain.jpg'), linear-gradient(160deg, #1b3a4f 0%, #2d4a62 38%, #101f33 100%)",
        thunderstorm: "url('assets/weather/thunderstorm.jpg'), linear-gradient(160deg, #040812 0%, #0b1424 42%, #202b3a 100%)",
        mist: "url('assets/weather/mist.jpg'), linear-gradient(160deg, #556270 0%, #4b5966 38%, #2d3b49 100%)",
        snow: "url('assets/weather/snow.jpg'), linear-gradient(160deg, #8fa5bd 0%, #7288a3 40%, #425468 100%)",
        fallback: "url('assets/weather/cloudy.jpg'), linear-gradient(160deg, #425569 0%, #4f6276 40%, #263649 100%)"
    };

    const SEASON_BG = {
        spring: "url('assets/weather/seasons/spring.svg'), linear-gradient(160deg, #8fd19e 0%, #d9f2cf 58%, #f7d7e4 100%)",
        summer: "url('assets/weather/seasons/summer.svg'), linear-gradient(160deg, #3fa5e8 0%, #90d7f8 55%, #ffd889 100%)",
        autumn: "url('assets/weather/seasons/autumn.svg'), linear-gradient(160deg, #a65f33 0%, #d78d45 52%, #f1c06d 100%)",
        winter: "url('assets/weather/seasons/winter.svg'), linear-gradient(160deg, #88a6ca 0%, #cfdff0 58%, #edf5ff 100%)"
    };

    const dateEl = document.getElementById('weather-date');
    const cityEl = document.getElementById('weather-city');
    const tempEl = document.getElementById('weather-temp');
    const conditionEl = document.getElementById('weather-condition');
    const stateEl = document.getElementById('weather-state');
    const forecastEl = document.getElementById('weather-forecast');
    const heroBgEl = document.getElementById('heroWeatherBg');
    const globalBgEl = document.getElementById('globalWeatherBg');

    if (!dateEl || !cityEl || !tempEl || !conditionEl || !stateEl || !forecastEl || !heroBgEl || !globalBgEl) return;


    function seasonFromDate(dateValue, latitude = FALLBACK.latitude) {
        const date = dateValue ? new Date(dateValue) : new Date();
        const month = date.getMonth() + 1;

        let season = 'winter';
        if (month >= 3 && month <= 5) season = 'spring';
        else if (month >= 6 && month <= 8) season = 'summer';
        else if (month >= 9 && month <= 11) season = 'autumn';

        return latitude < 0 ? flipHemisphereSeason(season) : season;
    }

    function flipHemisphereSeason(season) {
        const map = {
            spring: 'autumn',
            summer: 'winter',
            autumn: 'spring',
            winter: 'summer'
        };
        return map[season] || season;
    }

    function setDateLabel() {
        dateEl.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    function weatherLabelFromCode(code) {
        if (code === 0) return 'Clear';
        if ([1, 2, 3].includes(code)) return 'Cloudy';
        if ([45, 48].includes(code)) return 'Mist';
        if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
        if ([95, 96, 99].includes(code)) return 'Thunderstorm';
        if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
        return 'Variable';
    }

    function pickWeatherKey(main, isNight) {
        const m = (main || '').toLowerCase();
        if (m.includes('clear')) return isNight ? 'clear-night' : 'clear-day';
        if (m.includes('cloud')) return 'cloudy';
        if (m.includes('rain') || m.includes('drizzle')) return 'rain';
        if (m.includes('thunder')) return 'thunderstorm';
        if (m.includes('mist') || m.includes('fog') || m.includes('haze') || m.includes('smoke')) return 'mist';
        if (m.includes('snow')) return 'snow';
        return 'fallback';
    }

    function isNightBySun(dayData) {
        if (!dayData?.sunrise || !dayData?.sunset) return false;
        const now = Date.now();
        const sunrise = new Date(dayData.sunrise).getTime();
        const sunset = new Date(dayData.sunset).getTime();
        return now < sunrise || now > sunset;
    }

    function setBackgroundWithFade(el, backgroundImage) {
        if (!el) return;
        const current = el.dataset.currentBg;
        if (current === backgroundImage) return;

        el.style.opacity = '0';
        window.setTimeout(() => {
            el.style.backgroundImage = backgroundImage;
            el.dataset.currentBg = backgroundImage;
            el.style.opacity = '1';
        }, 220);
    }

    function classFromKey(key) {
        const map = {
            'clear-day': 'bg-clear-day',
            'clear-night': 'bg-clear-night',
            cloudy: 'bg-cloudy',
            rain: 'bg-rain',
            thunderstorm: 'bg-storm',
            mist: 'bg-mist',
            snow: 'bg-mist',
            fallback: 'bg-cloudy'
        };
        return map[key] || 'bg-cloudy';
    }

    function applyWeatherSceneForDay(dayData, isNightOverride = null, latitude = FALLBACK.latitude) {
        const main = weatherLabelFromCode(dayData?.code || -1);
        const isNight = isNightOverride === null ? isNightBySun(dayData) : isNightOverride;
        const key = pickWeatherKey(main, isNight);
        const season = seasonFromDate(dayData?.date, latitude);

        const seasonalKeys = new Set(['clear-day', 'cloudy', 'mist', 'fallback']);
        const weatherBg = WEATHER_BG[key] || WEATHER_BG.fallback;
        const bg = seasonalKeys.has(key) ? (SEASON_BG[season] || weatherBg) : weatherBg;

        setBackgroundWithFade(heroBgEl, bg);
        setBackgroundWithFade(globalBgEl, bg);

        const classes = ['bg-clear-day', 'bg-clear-night', 'bg-cloudy', 'bg-rain', 'bg-storm', 'bg-mist'];
        document.body.classList.remove(...classes);
        document.body.classList.add(classFromKey(key), 'weather-ready');
    }

    function renderForecast(days) {
        forecastEl.innerHTML = days
            .slice(0, 7)
            .map((day, index) => {
                const date = new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });
                return `
                    <div class="forecast-day" data-day-index="${index}">
                        <p>${date}</p>
                        <p>${Math.round(day.max)}° / ${Math.round(day.min)}°</p>
                        <p>${weatherLabelFromCode(day.code)}</p>
                    </div>
                `;
            })
            .join('');
    }

    function bindForecastClicks(days) {
        const nodes = document.querySelectorAll('.forecast-day');
        nodes.forEach((node) => {
            node.addEventListener('click', () => {
                nodes.forEach((n) => n.classList.remove('is-active'));
                node.classList.add('is-active');

                const idx = Number(node.dataset.dayIndex || '0');
                const selected = days[idx] || days[0];
                tempEl.textContent = `${Math.round((selected.max + selected.min) / 2)}°C`;
                conditionEl.textContent = weatherLabelFromCode(selected.code);
                applyWeatherSceneForDay(selected, idx === 0 ? null : false, selected.latitude || FALLBACK.latitude);
            });
        });

        const first = document.querySelector(".forecast-day[data-day-index='0']");
        if (first) first.classList.add('is-active');
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
            daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
            timezone: 'auto',
            forecast_days: '7'
        });

        const response = await fetch(`${WEATHER_URL}?${params.toString()}`);
        if (!response.ok) throw new Error('Weather API unavailable');
        return response.json();
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
                () => {
                    stateEl.textContent = 'Location denied. Using Bangkok.';
                    resolve(FALLBACK);
                },
                { timeout: 5000 }
            );
        });
    }

    async function init() {
        setDateLabel();
        stateEl.textContent = 'Loading weather data...';

        try {
            const location = await getLocation();
            const [weather, city] = await Promise.all([
                fetchWeather(location.latitude, location.longitude),
                reverseGeocode(location.latitude, location.longitude)
            ]);

            const days = weather.daily.time.map((date, idx) => ({
                date,
                max: weather.daily.temperature_2m_max[idx],
                min: weather.daily.temperature_2m_min[idx],
                code: weather.daily.weather_code[idx],
                sunrise: weather.daily.sunrise[idx],
                sunset: weather.daily.sunset[idx],
                latitude: location.latitude
            }));

            cityEl.textContent = city;
            tempEl.textContent = `${Math.round(weather.current.temperature_2m)}°C`;
            conditionEl.textContent = weatherLabelFromCode(weather.current.weather_code);

            renderForecast(days);
            bindForecastClicks(days);

            const today = days[0];
            applyWeatherSceneForDay(today, weather.current.is_day === 0, location.latitude);
            stateEl.textContent = 'Weather updated.';
        } catch (error) {
            console.error(error);
            cityEl.textContent = FALLBACK.city;
            tempEl.textContent = '--°C';
            conditionEl.textContent = 'Weather unavailable';
            stateEl.textContent = 'Weather unavailable.';
            const fallbackBg = WEATHER_BG.fallback;
            setBackgroundWithFade(heroBgEl, fallbackBg);
            setBackgroundWithFade(globalBgEl, fallbackBg);
            document.body.classList.add('bg-cloudy');
        }
    }

    init();
})();
