window.addEventListener('load', ()=>{
    let currentDateAndTime = document.querySelector('.date-and-time');
    let location = document.querySelector('.location-section .location');
    let i = 1;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const long = position.coords.longitude;
            const lat = position.coords.latitude;

            // // Get the user's location using the Geolocation API
            setLocation(lat, long, location);

            // Get the user's weather using the OpenWeather API
            setWeather(lat, long);

            currentDateAndTime.textContent = getCurrentDate().toString();
        });

    }


    async function setWeather(lat, long) {
        const meteoWeatherAPIUrl = `https://www.meteosource.com/api/v1/free/point?lat=${lat}&lon=${long}&sections=current%2Cdaily&language=en&units=auto&key=b89qv8yczd4bhiz310mpgbafdygaz1wyfxjh4aff`;
        //const meteoWeatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5f0af5bbd4a8259eeb3c759055346070&units=metric`;
        await fetch(meteoWeatherAPIUrl)
            .then (response =>{
                return response.json();
                // dummy data for testing below
                //return JSON.parse("{\"lat\":\"43.70011N\",\"lon\":\"79.4163W\",\"elevation\":175,\"timezone\":\"EST\",\"units\":\"metric\",\"current\":{\"icon\":\"partly_sunny\",\"icon_num\":4,\"summary\":\"Partly sunny\",\"temperature\":6.0,\"wind\":{\"speed\":2.7,\"angle\":323,\"dir\":\"NW\"},\"precipitation\":{\"total\":0.0,\"type\":\"none\"},\"cloud_cover\":31},\"hourly\":{\"data\":[{\"date\":\"2023-03-21T10:00:00\",\"weather\":\"partly_sunny\",\"icon\":4,\"summary\":\"Partly sunny\",\"temperature\":6.0,\"wind\":{\"speed\":2.7,\"dir\":\"NW\",\"angle\":323},\"cloud_cover\":{\"total\":31},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-21T11:00:00\",\"weather\":\"partly_sunny\",\"icon\":4,\"summary\":\"Partly sunny\",\"temperature\":6.0,\"wind\":{\"speed\":2.2,\"dir\":\"NW\",\"angle\":321},\"cloud_cover\":{\"total\":39},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-21T12:00:00\",\"weather\":\"partly_sunny\",\"icon\":4,\"summary\":\"Partly sunny\",\"temperature\":5.8,\"wind\":{\"speed\":1.6,\"dir\":\"NW\",\"angle\":308},\"cloud_cover\":{\"total\":52},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-21T13:00:00\",\"weather\":\"cloudy\",\"icon\":6,\"summary\":\"Cloudy\",\"temperature\":7.2,\"wind\":{\"speed\":2.1,\"dir\":\"NW\",\"angle\":311},\"cloud_cover\":{\"total\":85},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-21T14:00:00\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Overcast\",\"temperature\":7.5,\"wind\":{\"speed\":1.9,\"dir\":\"NNW\",\"angle\":336},\"cloud_cover\":{\"total\":99},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-21T15:00:00\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Overcast\",\"temperature\":7.0,\"wind\":{\"speed\":1.1,\"dir\":\"N\",\"angle\":5},\"cloud_cover\":{\"total\":100},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-21T16:00:00\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Overcast\",\"temperature\":7.0,\"wind\":{\"speed\":1.7,\"dir\":\"NNE\",\"angle\":33},\"cloud_cover\":{\"total\":100},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-21T17:00:00\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Overcast\",\"temperature\":6.8,\"wind\":{\"speed\":2.4,\"dir\":\"NE\",\"angle\":47},\"cloud_cover\":{\"total\":100},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-21T18:00:00\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Overcast\",\"temperature\":6.0,\"wind\":{\"speed\":2.7,\"dir\":\"ENE\",\"angle\":60},\"cloud_cover\":{\"total\":100},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-21T19:00:00\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Overcast\",\"temperature\":5.2,\"wind\":{\"speed\":2.5,\"dir\":\"ENE\",\"angle\":65},\"cloud_cover\":{\"total\":100},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-21T20:00:00\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Overcast\",\"temperature\":4.2,\"wind\":{\"speed\":2.3,\"dir\":\"ENE\",\"angle\":74},\"cloud_cover\":{\"total\":100},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-21T21:00:00\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Overcast\",\"temperature\":3.5,\"wind\":{\"speed\":2.1,\"dir\":\"E\",\"angle\":81},\"cloud_cover\":{\"total\":100},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-21T22:00:00\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Overcast\",\"temperature\":3.0,\"wind\":{\"speed\":2.1,\"dir\":\"E\",\"angle\":95},\"cloud_cover\":{\"total\":100},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-21T23:00:00\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Overcast\",\"temperature\":2.8,\"wind\":{\"speed\":2.3,\"dir\":\"E\",\"angle\":94},\"cloud_cover\":{\"total\":100},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-22T00:00:00\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Overcast\",\"temperature\":2.2,\"wind\":{\"speed\":2.3,\"dir\":\"E\",\"angle\":91},\"cloud_cover\":{\"total\":93},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-22T01:00:00\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Overcast\",\"temperature\":2.0,\"wind\":{\"speed\":2.5,\"dir\":\"E\",\"angle\":84},\"cloud_cover\":{\"total\":91},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-22T02:00:00\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Overcast\",\"temperature\":1.8,\"wind\":{\"speed\":2.6,\"dir\":\"ESE\",\"angle\":104},\"cloud_cover\":{\"total\":95},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-22T03:00:00\",\"weather\":\"mostly_cloudy\",\"icon\":29,\"summary\":\"Mostly cloudy\",\"temperature\":1.5,\"wind\":{\"speed\":2.9,\"dir\":\"ESE\",\"angle\":102},\"cloud_cover\":{\"total\":79},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-22T04:00:00\",\"weather\":\"cloudy\",\"icon\":30,\"summary\":\"Cloudy\",\"temperature\":1.2,\"wind\":{\"speed\":3.1,\"dir\":\"ESE\",\"angle\":102},\"cloud_cover\":{\"total\":86},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-22T05:00:00\",\"weather\":\"cloudy\",\"icon\":30,\"summary\":\"Cloudy\",\"temperature\":1.0,\"wind\":{\"speed\":3.3,\"dir\":\"ESE\",\"angle\":103},\"cloud_cover\":{\"total\":84},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-22T06:00:00\",\"weather\":\"cloudy\",\"icon\":6,\"summary\":\"Cloudy\",\"temperature\":0.8,\"wind\":{\"speed\":3.4,\"dir\":\"ESE\",\"angle\":110},\"cloud_cover\":{\"total\":84},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-22T07:00:00\",\"weather\":\"cloudy\",\"icon\":6,\"summary\":\"Cloudy\",\"temperature\":0.8,\"wind\":{\"speed\":3.8,\"dir\":\"ESE\",\"angle\":104},\"cloud_cover\":{\"total\":90},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-22T08:00:00\",\"weather\":\"cloudy\",\"icon\":6,\"summary\":\"Cloudy\",\"temperature\":1.5,\"wind\":{\"speed\":4.0,\"dir\":\"E\",\"angle\":97},\"cloud_cover\":{\"total\":84},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},{\"date\":\"2023-03-22T09:00:00\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Overcast\",\"temperature\":2.5,\"wind\":{\"speed\":3.4,\"dir\":\"E\",\"angle\":91},\"cloud_cover\":{\"total\":100},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}}]},\"daily\":{\"data\":[{\"day\":\"2023-03-21\",\"weather\":\"mostly_cloudy\",\"icon\":5,\"summary\":\"Partly sunny changing to cloudy by afternoon and evening. Temperature 3/8 °C.\",\"all_day\":{\"weather\":\"mostly_cloudy\",\"icon\":5,\"temperature\":5.2,\"temperature_min\":3.0,\"temperature_max\":7.5,\"wind\":{\"speed\":2.9,\"dir\":\"WNW\",\"angle\":286},\"cloud_cover\":{\"total\":84},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},\"morning\":null,\"afternoon\":null,\"evening\":null},{\"day\":\"2023-03-22\",\"weather\":\"overcast\",\"icon\":7,\"summary\":\"Cloudy. Temperature 1/5 °C.\",\"all_day\":{\"weather\":\"overcast\",\"icon\":7,\"temperature\":3.2,\"temperature_min\":0.8,\"temperature_max\":5.2,\"wind\":{\"speed\":3.4,\"dir\":\"SE\",\"angle\":134},\"cloud_cover\":{\"total\":95},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},\"morning\":null,\"afternoon\":null,\"evening\":null},{\"day\":\"2023-03-23\",\"weather\":\"light_rain\",\"icon\":10,\"summary\":\"Light rain changing to cloudy by evening. Temperature 3/8 °C.\",\"all_day\":{\"weather\":\"light_rain\",\"icon\":10,\"temperature\":5.8,\"temperature_min\":2.5,\"temperature_max\":8.0,\"wind\":{\"speed\":2.6,\"dir\":\"WNW\",\"angle\":283},\"cloud_cover\":{\"total\":98},\"precipitation\":{\"total\":10.2,\"type\":\"rain\"}},\"morning\":null,\"afternoon\":null,\"evening\":null},{\"day\":\"2023-03-24\",\"weather\":\"mostly_cloudy\",\"icon\":5,\"summary\":\"Partly sunny changing to cloudy by evening. Temperature -1/6 °C.\",\"all_day\":{\"weather\":\"mostly_cloudy\",\"icon\":5,\"temperature\":2.2,\"temperature_min\":-0.8,\"temperature_max\":6.2,\"wind\":{\"speed\":2.4,\"dir\":\"NNE\",\"angle\":24},\"cloud_cover\":{\"total\":77},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},\"morning\":null,\"afternoon\":null,\"evening\":null},{\"day\":\"2023-03-25\",\"weather\":\"rain\",\"icon\":11,\"summary\":\"Rain, reducing in the evening. Temperature 0/2 °C. Wind from NE.\",\"all_day\":{\"weather\":\"rain\",\"icon\":11,\"temperature\":1.0,\"temperature_min\":0.2,\"temperature_max\":1.8,\"wind\":{\"speed\":5.6,\"dir\":\"ENE\",\"angle\":76},\"cloud_cover\":{\"total\":100},\"precipitation\":{\"total\":31.1,\"type\":\"rain\"}},\"morning\":null,\"afternoon\":null,\"evening\":null},{\"day\":\"2023-03-26\",\"weather\":\"partly_sunny\",\"icon\":4,\"summary\":\"Partly sunny. Temperature rising to 7 °C. Wind from NW in the afternoon.\",\"all_day\":{\"weather\":\"partly_sunny\",\"icon\":4,\"temperature\":3.0,\"temperature_min\":0.2,\"temperature_max\":6.8,\"wind\":{\"speed\":4.9,\"dir\":\"WNW\",\"angle\":288},\"cloud_cover\":{\"total\":58},\"precipitation\":{\"total\":0.0,\"type\":\"none\"}},\"morning\":null,\"afternoon\":null,\"evening\":null},{\"day\":\"2023-03-27\",\"weather\":\"psbl_snow\",\"icon\":18,\"summary\":\"Mostly cloudy changing to rain in the afternoon. Temperature 0/3 °C.\",\"all_day\":{\"weather\":\"psbl_snow\",\"icon\":18,\"temperature\":1.5,\"temperature_min\":0.2,\"temperature_max\":3.2,\"wind\":{\"speed\":2.6,\"dir\":\"ENE\",\"angle\":69},\"cloud_cover\":{\"total\":76},\"precipitation\":{\"total\":11.8,\"type\":\"snow\"}},\"morning\":null,\"afternoon\":null,\"evening\":null}]}}");
            })
            .then(geolocationData => {
                console.log(geolocationData);
                // Display the forecast for the next 7 days
                const forecast = geolocationData.daily.data.slice(0, 5); // Get the forecast for every 24 hours
                const forecastTable = document.getElementById('forecast-table-meteosource');
                const unit = geolocationData.units === "us" ? "F" : "C";

                forecast.forEach(day => {
                    //const date = day.day;
                    const date = convertDate(day.day);
                    const temperature = `${day.all_day.temperature.toFixed(0)}&deg;` + unit;
                    const maxTemp = day.all_day.temperature_max.toFixed(0);
                    const minTemp = day.all_day.temperature_min.toFixed(0);
                    const minMaxTemp = minTemp + " to " + maxTemp + "&deg;" + unit;
                    const windSpeed = `${day.all_day.wind.speed} km/hr`;
                    const weather = day.summary;
                    const iconID= "icon" + i;
                    const row = `<tr><td>${date}</td><td>${temperature}</td><td>${minMaxTemp}</td><td>${windSpeed}</td><td><canvas id="${iconID}" class="icon" width="20" height="20"></canvas></td><td>${weather}</td></tr>`;
                    forecastTable.insertAdjacentHTML('beforeend', row);
                    addWeatherIcon(iconID, day.weather);
                    i++;
                });
            });


        const locationAPIUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
        fetch(locationAPIUrl)
            .then(response => {
                return response.json();
            })
            .then(weatherData => {
                let locationData ;
                if(weatherData.principalSubdivision.length === 0) {
                    locationData = weatherData.city + ", " + weatherData.countryName;
                } else {
                    locationData= weatherData.city + ", " + weatherData.principalSubdivision;
                }

                const openWeatherAPIUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationData}&units=metric&appid=5f0af5bbd4a8259eeb3c759055346070`;
                fetch(openWeatherAPIUrl)
                    .then(response => response.json())
                    .then(geolocationData => {
                        console.log(geolocationData);
                        // Display the forecast for the next 7 days
                        const forecast = geolocationData.list.filter((item, index) => index % 8 === 0); // Get the forecast for every 24 hours
                        const forecastTable = document.getElementById('forecast-table-open');
                        forecast.forEach(day => {
                            const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
                            const temperature = `${day.main.temp.toFixed(0)}&deg;C`;
                            const maxTemp = day.main.temp_max.toFixed(0);
                            const minTemp = day.main.temp_min.toFixed(0);
                            const minMaxTemp = minTemp + " to " + maxTemp + "&deg;C";
                            const windSpeed = `${day.wind.speed} km/hr`;
                            const weather = day.weather[0].description;
                            const iconID= "icon" + i;
                            const row = `<tr><td>${date}</td><td>${temperature}</td><td>${minMaxTemp}</td><td>${windSpeed}</td><td><canvas id="${iconID}" class="icon" width="20" height="20"></canvas></td><td>${weather}</td></tr>`;
                            forecastTable.insertAdjacentHTML('beforeend', row);
                            addWeatherIcon(iconID, weather);
                            i++;
                        });
                    })
                    .catch(error => console.error(error));
            });

        const weatherAPIURL = `https://api.weatherapi.com/v1/forecast.json?key=52c5ddc336f14e3299d13034232603&q=${lat},${long}&days=5&aqi=no&alerts=yes`;
        fetch(weatherAPIURL)
            .then(response => response.json())
            .then(weatherAPIData => {
                console.log(weatherAPIData);
                // Display the forecast for the next 7 days
                const forecast = weatherAPIData.forecast.forecastday.slice(0, 5) // Get the forecast for every 24 hours
                const forecastTable = document.getElementById('forecast-table-weatherapi');
                forecast.forEach(day => {
                    const date = convertDate(day.date);
                    const temperature = `${day.day.avgtemp_c.toFixed(0)}&deg;C`;
                    const maxTemp = day.day.maxtemp_c.toFixed(0);
                    const minTemp = day.day.mintemp_c.toFixed(0);
                    const minMaxTemp = minTemp + " to " + maxTemp + "&deg;C";
                    const windSpeed = `${day.day.maxwind_kph} km/hr`;
                    const weather = day.day.condition.text;
                    const iconID= "icon" + i;
                    const row = `<tr><td>${date}</td><td>${temperature}</td><td>${minMaxTemp}</td><td>${windSpeed}</td><td><canvas id="${iconID}" class="icon" width="20" height="20"></canvas></td><td>${weather}</td></tr>`;
                    forecastTable.insertAdjacentHTML('beforeend', row);
                    addWeatherIcon(iconID, weather);
                    i++;
                });
            //.catch(error => console.error(error));
        });


    }


    function addWeatherIcon(iconID, iconDescData){
        // console.log("iconID", iconID)
        // console.log("iconDescData", iconDescData)
        const skycons = new Skycons({"color": "white"});
        let iconMapDay = {
            /** Meteosource */
            'sunny': Skycons.CLEAR_DAY,
            'mostly_sunny': Skycons.PARTLY_CLOUDY_DAY,
            'partly_sunny': Skycons.PARTLY_CLOUDY_DAY,
            'mostly_cloudy': Skycons.PARTLY_CLOUDY_DAY,
            'cloudy': Skycons.CLOUDY,
            'overcast': Skycons.CLOUDY,
            'overcast_with_low_clouds': Skycons.CLOUDY,
            'fog': Skycons.FOG,
            'light_rain': Skycons.SHOWERS_DAY,
            'rain': Skycons.RAIN,
            'psbl_rain': Skycons.RAIN,
            'rain_shower': Skycons.SHOWERS_DAY,
            'tstorm': Skycons.THUNDER_RAIN,
            'tstorm_shower': Skycons.THUNDER_RAIN,
            'thunderstorm': Skycons.THUNDER_RAIN,
            'local_thunderstorms': Skycons.THUNDER_SHOWERS_DAY,
            'light_snow': Skycons.SNOW,
            'snow': Skycons.SNOW,
            'psbl_snow': Skycons.SNOW,
            'snow_shower': Skycons.SNOW_SHOWERS_DAY,
            'rain_and_snow': Skycons.SNOW_SHOWERS_DAY,
            'psbl_rain_and_snow': Skycons.SNOW_SHOWERS_DAY,
            'freezing_rain': Skycons.SNOW_SHOWERS_DAY,
            'psbl_freezing_rain': Skycons.SNOW_SHOWERS_DAY,
            'hail': Skycons.HAIL,
            'clear_(night)': Skycons.CLEAR_NIGHT,
            'mostly_clear_(night)': Skycons.PARTLY_CLOUDY_NIGHT,
            'partly_clear_(night)': Skycons.PARTLY_CLOUDY_NIGHT,
            'cloudy_(night)': Skycons.PARTLY_CLOUDY_NIGHT,
            'overcast_with_low_clouds_(night)': Skycons.CLOUDY,
            'rain_shower_(night)': Skycons.SHOWERS_NIGHT,
            'local_thunderstorms_(night)': Skycons.THUNDER_SHOWERS_NIGHT,
            'snow_shower_(night)': Skycons.SNOW_SHOWERS_NIGHT,
            'rain_and_snow_(night)': Skycons.RAIN_SNOW_SHOWERS_NIGHT,
            'psbl_freezing_rain_(night)': Skycons.SNOW_SHOWERS_NIGHT,

            /** Open Weather */
            'clear sky': Skycons.CLEAR_DAY,
            'few clouds': Skycons.PARTLY_CLOUDY_DAY,
            'scattered clouds': Skycons.PARTLY_CLOUDY_DAY,
            'broken clouds': Skycons.PARTLY_CLOUDY_DAY,
            'overcast clouds': Skycons.CLOUDY,
            'light intensity drizzle rain': Skycons.SHOWERS_NIGHT,
            'light rain': Skycons.SHOWERS_DAY,
            'moderate rain': Skycons.RAIN,
            'heavy intensity rain': Skycons.RAIN,
            'very heavy rain': Skycons.RAIN,
            'extreme rain': Skycons.RAIN,
            'freezing rain': Skycons.RAIN,
            'light intensity shower rain': Skycons.SHOWERS_DAY,
            'shower rain': Skycons.SHOWERS_DAY,
            'heavy intensity shower rain': Skycons.RAIN,
            'light snow': Skycons.SNOW_SHOWERS_DAY,
            //'snow': Skycons.SNOW,
            'heavy snow': Skycons.SNOW,
            'sleet': Skycons.SLEET,
            'shower sleet': Skycons.SLEET,
            'light rain and snow': Skycons.RAIN_SNOW_SHOWERS_DAY,
            'rain and snow': Skycons.RAIN_SNOW,
            'light shower snow': Skycons.SNOW_SHOWERS_DAY,
            'shower snow': Skycons.RAIN_SNOW,
            'heavy shower snow': Skycons.RAIN_SNOW,
            'haze': Skycons.FOG,
            //'fog': Skycons.FOG,
            'mist': Skycons.FOG,
            'smoke': Skycons.FOG,

            /** Weather API */
            'Sunny': Skycons.CLEAR_DAY,
            'Partly cloudy': Skycons.PARTLY_CLOUDY_DAY,
            'Cloudy': Skycons.CLOUDY,
            'Overcast': Skycons.CLOUDY,
            'Patchy rain possible': Skycons.SHOWERS_DAY,
            'Patchy snow possible': Skycons.SNOW_SHOWERS_DAY,
            'Sleet': Skycons.SLEET,
            'Patchy freezing drizzle possible': Skycons.SHOWERS_DAY,
            'Thundery outbreaks possible': Skycons.THUNDER_SHOWERS_DAY,
            'Blowing snow': Skycons.SNOW,
            'Blizzard': Skycons.SNOW,
            'Fog': Skycons.FOG,
            'Freezing fog': Skycons.FOG,
            'Mist': Skycons.FOG,
            'Patchy light drizzle': Skycons.SHOWERS_DAY,
            'Light drizzle': Skycons.SHOWERS_DAY,
            'Freezing drizzle': Skycons.SHOWERS_DAY,
            'Heavy freezing drizzle': Skycons.SHOWERS_DAY,
            'Patchy light rain': Skycons.SHOWERS_DAY,
            'Light rain': Skycons.SHOWERS_DAY,
            'Moderate rain at times': Skycons.SHOWERS_DAY,
            'Moderate rain': Skycons.RAIN,
            'Heavy rain at times': Skycons.RAIN,
            'Heavy rain': Skycons.RAIN,
            'Light freezing rain': Skycons.SHOWERS_DAY,
            'Moderate or heavy freezing rain': Skycons.RAIN,
            'Light sleet': Skycons.SLEET,
            'Moderate or heavy sleet': Skycons.SLEET,
            'Patchy light snow': Skycons.SNOW_SHOWERS_DAY,
            'Light snow': Skycons.SNOW_SHOWERS_DAY,
            'Patchy moderate snow': Skycons.SNOW,
            'Moderate snow': Skycons.SNOW,
            'Patchy heavy snow': Skycons.SNOW,
            'Heavy snow': Skycons.SNOW,
            'Ice pellets': Skycons.SNOW,
            'Light rain shower': Skycons.SHOWERS_DAY,
            'Moderate or heavy rain shower': Skycons.RAIN,
            'Torrential rain shower': Skycons.RAIN,
            'Light sleet showers': Skycons.RAIN_SNOW_SHOWERS_DAY,
            'Moderate or heavy sleet showers': Skycons.SNOW_SHOWERS_DAY,
            'Light snow showers': Skycons.SNOW_SHOWERS_DAY,
            'Moderate or heavy snow showers': Skycons.RAIN_SNOW,
            'Light showers of ice pellets': Skycons.RAIN_SNOW,
            'Moderate or heavy showers of ice pellets': Skycons.RAIN_SNOW,
            'Patchy light rain with thunder': Skycons.THUNDER_SHOWERS_DAY,
            'Moderate or heavy rain with thunder': Skycons.THUNDER_RAIN,
            'Patchy light snow with thunder': Skycons.THUNDER_SHOWERS_DAY,
            'Moderate or heavy snow with thunder': Skycons.THUNDER_SHOWERS_DAY,

            'default': Skycons.CLEAR_DAY
        };

        skycons.set(iconID, iconMapDay[iconDescData]);
        skycons.play();
    }


    function setLocation(lat, long, location) {
        // Get the user's location using the Geolocation API
        const locationAPIUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`;
        fetch(locationAPIUrl)
            .then(response => {
                return response.json();
            })
            .then(weatherData => {
                if(weatherData.principalSubdivision.length === 0) {
                    location.textContent = weatherData.city + ", " + weatherData.countryName;
                } else {
                    location.textContent = weatherData.city + ", " + weatherData.principalSubdivision;
                }
            });
    }

    function getCurrentDate() {
        return new Date();
    }

    function convertDate(date) {
        var dateToken = date.split("-");
        var newDate = new Date(dateToken[0], parseInt(dateToken[1])-1, dateToken[2]);
        return moment(newDate).format('dddd, MMMM D');
    }

});
