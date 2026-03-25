"use strict";


(function () {
    /* -- Config -- */
    const METEO_KEY = "b89qv8yczd4bhiz310mpgbafdygaz1wyfxjh4aff";
    const WEATHER_API_KEY = "52c5ddc336f14e3299d13034232603";
    const OPEN_WEATHER_KEY = "5f0af5bbd4a8259eeb3c759055346070";
    const BIGDATA_KEY = "bdc_8fbc9f42b0d04e6dafb55be580ad2aac";
    const DEFAULT_LAT = 43.8828;
    const DEFAULT_LON = -79.4403;
    const GEO_TIMEOUT = 10000;


    /* -- State -- */
    let useCelsius = true;
    let forecastData = { meteosource: null, weatherapi: null, openweather: null };
    let locationName = "";


    /* -- DOM refs -- */
    const $ = (s) => document.querySelector(s);
    const elLoading = $("#loading-overlay");
    const elError = $("#error-message");
    const elErrorText = $("#error-text");
    const elMain = $("#main-content");
    const elUnitToggle = $("#unit-toggle");
    const elLocation = $("#location-name");
    const elDateTime = $("#current-datetime");


    /* -- Weather Emoji Map -- */
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
