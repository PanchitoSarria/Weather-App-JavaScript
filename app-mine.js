// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

// const API_URL = `api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`


// HTML Elements
const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

const weather = {
    temperature :{
        value : 18,
        unit : 'celsius'
    },
    description : "",
    iconId : '',
    city : 'London',
    country : 'GB'
}


// Get Navigator Geo Location
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = '<p>El navegador no soporta geolocalización</p>'
}

function setPosition(position){
    const longitude = position.coords.longitude
    const latitude = position.coords.latitude

    getWeather(latitude, longitude)
}

function getWeather(latitude, longitude){
    let api = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

    fetch(api).then( api, (response) => {
        let data = response.json()
        return data
    })
    .then( data => {
        console.log(data)
    })
}

function showError(error){
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = `<p>${error.message}</p>`
}

function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`
    tempElement.innerHTML = `${weather.temperature.value} °<span>C</span>`
    descElement.innerHTML = `${weather.description}`
    locationElement.innerHTML = `${weather.city}, ${weather.country}`
}

function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32
}

tempElement.addEventListener('click', function(){
    if(weather.temperature.value === undefined) return
    if(weather.temperature.unit === 'celsius'){
        const fahrenheit = celsiusToFahrenheit(weather.temperature.value)
        fahrenheit = Math.floor(fahrenheit)
        tempElement.innerHTML = `${fahrenheit} °<span>F</span>`
        weather.temperature.unit = 'fahrenheit'
    } else {
        tempElement.innerHTML = `${weather.temperature.value} °<span>C</span>`
        weather.temperature.unit = 'celsius'
    }
})