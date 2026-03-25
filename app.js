"use strict";

(function () {
    /* ── Config ── */
    const METEO_KEY = "b89qv8yczd4bhiz310mpgbafdygaz1wyfxjh4aff";
    const WEATHER_API_KEY = "52c5ddc336f14e3299d13034232603";
    const OPEN_WEATHER_KEY = "5f0af5bbd4a8259eeb3c759055346070";
    const BIGDATA_KEY = "bdc_8fbc9f42b0d04e6dafb55be580ad2aac";
    const DEFAULT_LAT = 43.8828;
    const DEFAULT_LON = -79.4403;
    const GEO_TIMEOUT = 10000;

    /* ── State ── */
    let useCelsius = true;
    let forecastData = { meteosource: null, weatherapi: null, openweather: null };
    let locationName = "";

    /* ── DOM refs ── */
    const $ = (s) => document.querySelector(s);
    const elLoading = $("#loading-overlay");
    const elError = $("#error-message");
    const elErrorText = $("#error-text");
    const elMain = $("#main-content");
    const elUnitToggle = $("#unit-toggle");
    const elLocation = $("#location-name");
    const elDateTime = $("#current-datetime");

    /* ── Weather Emoji Map ── */
    const weatherEmojis = {
        /* MeteoSource */
        'sunny': '☀️', 'mostly_sunny': '🌤️', 'partly_sunny': '⛅', 'mostly_cloudy': '🌥️',
        'cloudy': '☁️', 'overcast': '☁️', 'overcast_with_low_clouds': '☁️',
        'fog': '🌫️', 'light_rain': '🌦️', 'rain': '🌧️', 'psbl_rain': '🌧️',
        'rain_shower': '🌦️', 'tstorm': '⛈️', 'tstorm_shower': '⛈️',
        'thunderstorm': '⛈️', 'local_thunderstorms': '⛈️',
        'light_snow': '🌨️', 'snow': '❄️', 'psbl_snow': '❄️',
        'snow_shower': '🌨️', 'rain_and_snow': '🌨️', 'psbl_rain_and_snow': '🌨️',
        'freezing_rain': '🌨️', 'psbl_fr_rain': '🌨️', 'hail': '🧊',
        'clear_(night)': '🌙', 'mostly_clear_(night)': '🌙', 'partly_clear_(night)': '🌙',
        'cloudy_(night)': '☁️', 'overcast_with_low_clouds_(night)': '☁️',
        'rain_shower_(night)': '🌧️', 'local_thunderstorms_(night)': '⛈️',
        'snow_shower_(night)': '🌨️', 'rain_and_snow_(night)': '🌨️',
        'psbl_freezing_rain_(night)': '🌨️',

        /* Open Weather */
        'clear sky': '☀️', 'few clouds': '🌤️', 'scattered clouds': '⛅',
        'broken clouds': '🌥️', 'overcast clouds': '☁️',
        'light rain': '🌦️', 'moderate rain': '🌧️', 'heavy intensity rain': '🌧️',
        'very heavy rain': '🌧️', 'extreme rain': '🌧️', 'freezing rain': '🌨️',
        'light intensity shower rain': '🌦️', 'shower rain': '🌧️',
        'heavy intensity shower rain': '🌧️', 'ragged shower rain': '🌧️',
        'light snow': '🌨️', 'snow': '❄️', 'heavy snow': '❄️',
        'sleet': '🌨️', 'shower sleet': '🌨️',
        'light rain and snow': '🌨️', 'rain and snow': '🌨️',
        'light shower snow': '🌨️', 'shower snow': '🌨️', 'heavy shower snow': '🌨️',
        'thunderstorm': '⛈️', 'thunderstorm with light rain': '⛈️',
        'thunderstorm with rain': '⛈️', 'thunderstorm with heavy rain': '⛈️',
        'haze': '🌫️', 'mist': '🌫️', 'smoke': '🌫️', 'fog': '🌫️',

        /* WeatherAPI */
        'Sunny': '☀️', 'Clear': '🌙', 'Partly cloudy': '⛅', 'Cloudy': '🌥️',
        'Overcast': '☁️', 'Mist': '🌫️', 'Fog': '🌫️', 'Freezing fog': '🌫️',
        'Patchy rain possible': '🌦️', 'Patchy snow possible': '🌨️',
        'Patchy sleet possible': '🌨️', 'Patchy freezing drizzle possible': '🌦️',
        'Thundery outbreaks possible': '⛈️', 'Blowing snow': '❄️', 'Blizzard': '❄️',
        'Patchy light drizzle': '🌦️', 'Light drizzle': '🌦️',
        'Freezing drizzle': '🌦️', 'Heavy freezing drizzle': '🌦️',
        'Patchy light rain': '🌦️', 'Light rain': '🌦️',
        'Moderate rain at times': '🌧️', 'Moderate rain': '🌧️',
        'Heavy rain at times': '🌧️', 'Heavy rain': '🌧️',
        'Light freezing rain': '🌨️', 'Moderate or heavy freezing rain': '🌨️',
        'Light sleet': '🌨️', 'Moderate or heavy sleet': '🌨️',
        'Patchy light snow': '🌨️', 'Light snow': '🌨️',
        'Patchy moderate snow': '❄️', 'Moderate snow': '❄️',
        'Patchy heavy snow': '❄️', 'Heavy snow': '❄️', 'Ice pellets': '🧊',
        'Light rain shower': '🌦️', 'Moderate or heavy rain shower': '🌧️',
        'Torrential rain shower': '🌧️',
        'Light sleet showers': '🌨️', 'Moderate or heavy sleet showers': '🌨️',
        'Light snow showers': '🌨️', 'Moderate or heavy snow showers': '🌨️',
        'Light showers of ice pellets': '🧊', 'Moderate or heavy showers of ice pellets': '🧊',
        'Patchy light rain with thunder': '⛈️', 'Moderate or heavy rain with thunder': '⛈️',
        'Patchy light snow with thunder': '⛈️', 'Moderate or heavy snow with thunder': '⛈️',
        'Moderate or heavy snow showers': '🌨️',

        'default': '🌡️'
    };

    function getEmoji(condition) {
        if (!condition) return weatherEmojis['default'];
        return weatherEmojis[condition] || weatherEmojis[condition.toLowerCase()] || weatherEmojis['default'];
    }

    /* ── Temperature Conversion ── */
    function tempC(val) { return Math.round(val); }
    function tempDisplay(celsius) {
        if (useCelsius) return Math.round(celsius) + "°C";
        return Math.round(celsius * 9 / 5 + 32) + "°F";
    }
    function tempNum(celsius) {
        if (useCelsius) return Math.round(celsius);
        return Math.round(celsius * 9 / 5 + 32);
    }
    function tempUnit() { return useCelsius ? "°C" : "°F"; }

    /* ── Date Formatting ── */
    function formatDay(dateStr) {
        const d = new Date(dateStr + "T12:00:00");
        return d.toLocaleDateString("en-US", { weekday: "long" });
    }
    function formatDate(dateStr) {
        const d = new Date(dateStr + "T12:00:00");
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
    function formatDateFromTimestamp(ts) {
        const d = new Date(ts * 1000);
        return d.toISOString().split("T")[0];
    }
    function formatDayFromTimestamp(ts) {
        const d = new Date(ts * 1000);
        return d.toLocaleDateString("en-US", { weekday: "long" });
    }
    function formatDateShort(ts) {
        const d = new Date(ts * 1000);
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }

    /* ── Normalize Data ── */
    function normalizeMeteoSource(data) {
        if (!data || !data.daily || !data.daily.data) return [];
        return data.daily.data.slice(0, 5).map(day => ({
            dateKey: day.day,
            dayName: formatDay(day.day),
            dateLabel: formatDate(day.day),
            temp: day.all_day.temperature,
            min: day.all_day.temperature_min,
            max: day.all_day.temperature_max,
            wind: day.all_day.wind.speed,
            condition: day.summary,
            conditionShort: day.all_day.weather || day.summary,
            emoji: getEmoji(day.all_day.weather),
            detail: day.summary
        }));
    }

    function normalizeWeatherAPI(data) {
        if (!data || !data.forecast || !data.forecast.forecastday) return [];
        return data.forecast.forecastday.slice(0, 5).map(day => ({
            dateKey: day.date,
            dayName: formatDay(day.date),
            dateLabel: formatDate(day.date),
            temp: day.day.avgtemp_c,
            min: day.day.mintemp_c,
            max: day.day.maxtemp_c,
            wind: day.day.maxwind_kph,
            condition: day.day.condition.text,
            conditionShort: day.day.condition.text,
            emoji: getEmoji(day.day.condition.text),
            detail: day.day.condition.text
        }));
    }

    function normalizeOpenWeather(data) {
        if (!data || !data.list) return [];
        /* OpenWeather 5-day/3-hour → group by day, take noon or first entry */
        const byDay = {};
        data.list.forEach(item => {
            const dateKey = item.dt_txt ? item.dt_txt.split(" ")[0] : formatDateFromTimestamp(item.dt);
            if (!byDay[dateKey]) byDay[dateKey] = [];
            byDay[dateKey].push(item);
        });

        return Object.entries(byDay).slice(0, 5).map(([dateKey, items]) => {
            /* Prefer noon reading, fallback to first */
            const noon = items.find(i => i.dt_txt && i.dt_txt.includes("12:00")) || items[0];
            const allTemps = items.map(i => i.main.temp);
            const minT = Math.min(...allTemps);
            const maxT = Math.max(...allTemps);
            return {
                dateKey,
                dayName: formatDay(dateKey),
                dateLabel: formatDate(dateKey),
                temp: noon.main.temp,
                min: minT,
                max: maxT,
                wind: noon.wind.speed * 3.6,
                condition: noon.weather[0].description,
                conditionShort: noon.weather[0].description,
                emoji: getEmoji(noon.weather[0].description),
                detail: noon.weather[0].description
            };
        });
    }

    /* ── Rendering ── */
    function renderSourceCards(containerId, days) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = "";

        if (!days || days.length === 0) {
            container.innerHTML = '<div class="forecast-card"><p style="color:var(--text-muted);grid-column:1/-1;text-align:center;">No data available</p></div>';
            return;
        }

        days.forEach(day => {
            const card = document.createElement("div");
            card.className = "forecast-card";
            card.innerHTML = `
                <div class="fc-left">
                    <div class="fc-day">${day.dayName}</div>
                    <div class="fc-date">${day.dateLabel}</div>
                </div>
                <div class="fc-center">
                    <div class="fc-icon">${day.emoji}</div>
                    <div class="fc-condition">${day.conditionShort}</div>
                </div>
                <div class="fc-right">
                    <div class="fc-temp">${tempDisplay(day.temp)}</div>
                    <div class="fc-range">${tempDisplay(day.min)} / ${tempDisplay(day.max)}</div>
                    <div class="fc-wind">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
                        ${day.wind.toFixed(1)} km/h
                    </div>
                </div>
                ${day.detail && day.detail !== day.conditionShort ? `<div class="fc-detail">${day.detail}</div>` : ""}
            `;
            container.appendChild(card);
        });
    }

    function renderComparison() {
        const container = document.getElementById("comparison-container");
        if (!container) return;
        container.innerHTML = "";

        const meteo = forecastData.meteosource || [];
        const wapi = forecastData.weatherapi || [];
        const ow = forecastData.openweather || [];

        /* Collect all unique date keys */
        const allDates = new Map();
        [meteo, wapi, ow].forEach(src => {
            src.forEach(d => {
                if (!allDates.has(d.dateKey)) {
                    allDates.set(d.dateKey, { dayName: d.dayName, dateLabel: d.dateLabel });
                }
            });
        });

        /* Sort by date */
        const sorted = [...allDates.entries()].sort((a, b) => a[0].localeCompare(b[0]));

        if (sorted.length === 0) {
            container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px 0;">No forecast data available</p>';
            return;
        }

        sorted.forEach(([dateKey, info]) => {
            const mDay = meteo.find(d => d.dateKey === dateKey);
            const wDay = wapi.find(d => d.dateKey === dateKey);
            const oDay = ow.find(d => d.dateKey === dateKey);

            const block = document.createElement("div");
            block.className = "comparison-day";

            block.innerHTML = `
                <div class="comparison-day-header">
                    ${info.dayName}
                    <span class="date-sub">${info.dateLabel}</span>
                </div>
                <div class="comparison-sources">
                    ${renderComparisonSource("MeteoSource", mDay)}
                    ${renderComparisonSource("WeatherAPI", wDay)}
                    ${renderComparisonSource("OpenWeather", oDay)}
                </div>
            `;
            container.appendChild(block);
        });
    }

    function renderComparisonSource(name, day) {
        if (!day) {
            return `<div class="cs-unavailable"><span>${name}: N/A</span></div>`;
        }
        return `
            <div class="comparison-source">
                <div class="cs-name">${name}</div>
                <div class="cs-temp-row">
                    <span class="cs-icon">${day.emoji}</span>
                    <span class="cs-temp">${tempDisplay(day.temp)}</span>
                </div>
                <div class="cs-range">${tempDisplay(day.min)} – ${tempDisplay(day.max)}</div>
                <div class="cs-condition">${day.conditionShort}</div>
                <div class="cs-wind">Wind: ${day.wind.toFixed(1)} km/h</div>
            </div>
        `;
    }

    function renderAll() {
        forecastData.meteosource = normalizeMeteoSource(window.__rawMeteo);
        forecastData.weatherapi = normalizeWeatherAPI(window.__rawWeatherAPI);
        forecastData.openweather = normalizeOpenWeather(window.__rawOpenWeather);

        renderSourceCards("meteosource-cards", forecastData.meteosource);
        renderSourceCards("weatherapi-cards", forecastData.weatherapi);
        renderSourceCards("openweather-cards", forecastData.openweather);
        renderComparison();
    }

    /* ── Tab Switching ── */
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            document.querySelectorAll(".forecast-view").forEach(v => v.classList.remove("active"));
            const target = document.getElementById("view-" + btn.dataset.source);
            if (target) target.classList.add("active");
        });
    });

    /* ── Unit Toggle ── */
    elUnitToggle.addEventListener("click", () => {
        useCelsius = !useCelsius;
        elUnitToggle.textContent = useCelsius ? "°C" : "°F";
        renderAll();
    });

    /* ── Date/Time ── */
    function updateDateTime() {
        if (elDateTime) {
            const now = new Date();
            elDateTime.textContent = now.toLocaleString("en-US", {
                weekday: "short", year: "numeric", month: "short", day: "numeric",
                hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: "short"
            });
        }
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    /* ── Data Fetching ── */
    let fetchCount = 0;
    const TOTAL_FETCHES = 3;

    function checkAllLoaded() {
        fetchCount++;
        if (fetchCount >= TOTAL_FETCHES) {
            renderAll();
            elLoading.classList.add("hidden");
            elMain.style.display = "block";
        }
    }

    async function fetchForecasts(lat, lon) {
        /* MeteoSource */
        const meteoUrl = `https://www.meteosource.com/api/v1/free/point?lat=${lat}&lon=${lon}&sections=daily&language=en&key=${METEO_KEY}`;
        fetch(meteoUrl)
            .then(r => r.json())
            .then(data => { window.__rawMeteo = data; })
            .catch(err => { console.error("MeteoSource error:", err); window.__rawMeteo = null; })
            .finally(checkAllLoaded);

        /* WeatherAPI */
        const wapiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=5&aqi=no&alerts=no`;
        fetch(wapiUrl)
            .then(r => r.json())
            .then(data => { window.__rawWeatherAPI = data; })
            .catch(err => { console.error("WeatherAPI error:", err); window.__rawWeatherAPI = null; })
            .finally(checkAllLoaded);

        /* OpenWeather */
        const owUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric`;
        fetch(owUrl)
            .then(r => r.json())
            .then(data => { window.__rawOpenWeather = data; })
            .catch(err => { console.error("OpenWeather error:", err); window.__rawOpenWeather = null; })
            .finally(checkAllLoaded);
    }

    /* ── Location ── */
    function setLocation(lat, lon) {
        const locUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
        fetch(locUrl)
            .then(r => r.json())
            .then(data => {
                if (data.principalSubdivision) {
                    locationName = data.city + ", " + data.principalSubdivision;
                } else {
                    locationName = data.city + ", " + data.countryName;
                }
                if (elLocation) elLocation.textContent = locationName;
            })
            .catch(() => {
                if (elLocation) elLocation.textContent = "Unknown Location";
            });
    }

    /* ── Init ── */
    function init() {
        if (navigator.geolocation) {
            const geoTimer = setTimeout(() => {
                /* Fallback after timeout */
                console.log("Geolocation timeout, using default");
                startWithCoords(DEFAULT_LAT, DEFAULT_LON);
            }, GEO_TIMEOUT);

            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    clearTimeout(geoTimer);
                    startWithCoords(pos.coords.latitude, pos.coords.longitude);
                },
                () => {
                    clearTimeout(geoTimer);
                    startWithCoords(DEFAULT_LAT, DEFAULT_LON);
                },
                { timeout: GEO_TIMEOUT }
            );
        } else {
            startWithCoords(DEFAULT_LAT, DEFAULT_LON);
        }
    }

    function startWithCoords(lat, lon) {
        setLocation(lat, lon);
        fetchForecasts(lat, lon);
    }

    init();
})();
