// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "fcbb33b1b27174fa6af8e9531200770e";

const weather = {}
weather.temperature = {
    unit : "celsius"
}
// const weather = {
//     temperature:{
//         value: 28,
//         unit: 'C'
//     },
//     iconId: '000',
//     description: '',
//     city: 'Córdoba',
//     country: 'AR'
// }

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, error)
} else {
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = 'El navegador no cuenta con geolocalización'
}

function setPosition(position){
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

    getWeather(latitude, longitude)
}
function error(err){
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = `<p>${err.message}</p>`
}

function getWeather(lat, long){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`)
    .then(response => {
        let data = response.json()
        return data
    })
    .then(function(data){
        console.log(data)
        console.log(data.main.temp)
        weather.city = data.name
        weather.country = data.sys.country
        weather.description = data.weather[0].description
        weather.iconId = data.weather[0].icon
        weather.temperature.value = Math.floor(data.main.temp - KELVIN)

        showWeather(weather)
    })
    
}


function showWeather(weather){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png" alt="">`
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`
    locationElement.innerHTML = `${weather.city} <span>${weather.country}</span>`
    descElement.innerHTML = `${weather.description}`
}

tempElement.addEventListener('click', () => {
    if(weather.temperature.value === undefined) return
    if(weather.temperature.unit === 'celsius'){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value)
        fahrenheit = Math.floor(fahrenheit)
        tempElement.innerHTML = `${fahrenheit}° <span>F</span>`
        weather.temperature.unit = 'fahrenheit'
    } else {
        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`
        weather.temperature.unit = 'celsius'
    }
})

function celsiusToFahrenheit(temp){
    return (temp * 9/5) + 32
}