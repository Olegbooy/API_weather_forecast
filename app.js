"use strict"

const weatherBlock = document.getElementById('weather');

async function loadWeather(e) {

    const server = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Peremyshlyany&appid=c7e4eb8adbd073b0c99eaa5756da3549";
    const response = await fetch(server, {
        method: 'GET',
    });
    const responseResult = await response.json();
    if(response.ok) {
        getWeather(responseResult);
    } else{
        weatherBlock.innerHTML = responseResult.message;
    }
}

function getWeather(data) {
    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like)
    const weatherStatus = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;
    

    //HTML LAYOUT

    const template = `
        <div class="weather__header">
            <div class="weather__main">
                <div class="weather__city">${location}</div>
                <div class="weather__status">${weatherStatus }</div>
            </div>
            <div class="weather__icon">
                <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
            </div>
        </div>
        <div class="weather__temp">${temp}°C</div>
        <div class="weather__feels__like">Feels like: ${feelsLike}°C</div>
    `;

    weatherBlock.innerHTML = template;
}

if(weatherBlock) {
    loadWeather();
}
