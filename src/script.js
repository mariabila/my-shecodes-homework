let now = new Date();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let month = months[now.getMonth()];
let day = days[now.getDay()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = `${hours}:${minutes}`;

let currentDay = document.querySelector("#nowDate");
currentDay.innerHTML = `${day}, ${month} ${date}, ${time}`;

let apiKey = `597c40c39084687093b091cd48b366f8`;
let cityName = document.querySelector("h1");
let temperatureNow = document.querySelector(`#temperatureNow`);
let weatherDescription = document.querySelector(`small`);
let temperatureFeeling = document.querySelector(`#temp_feeling`);
let humidityNow = document.querySelector(`#humidity`);
let windSpeed = document.querySelector(`#wind`);
let weatherIcon = document.querySelector(`#weatherIcon`);

function checkWeather(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#cityInput");
  cityName.innerHTML = `${inputCity.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric&appid=${apiKey}`;

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    temperatureNow.innerHTML = temperature;
    let weather = response.data.weather[0].description;
    weatherDescription.innerHTML = weather;
    let feeling = Math.round(response.data.main.feels_like);
    temperatureFeeling.innerHTML = `feels like ` + feeling + `°C`;
    let humidity = response.data.main.humidity;
    humidityNow.innerHTML = humidity + `%`;
    let wind = Math.round(response.data.wind.speed * 3.6);
    windSpeed.innerHTML = `wind ` + wind + ` km/h`;
    weatherIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }
  axios.get(apiUrl).then(showTemperature);
}
let searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("submit", checkWeather);

function findPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  function showLocationWeather(response) {
    let locationName = response.data.name;
    let locationTemp = Math.round(response.data.main.temp);
    cityName.innerHTML = locationName;
    temperatureNow.innerHTML = locationTemp;
  }
  axios.get(apiLocationUrl).then(showLocationWeather);
}
function checkLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}
let locationButton = document.querySelector("#locButton");
locationButton.addEventListener("click", checkLocationWeather);

function showFahrenheit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#cityInput");
  cityName.innerHTML = `${inputCity.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric&appid=${apiKey}`;
  function getFahrenheit(response) {
    let currentFahrenheit = Math.round((response.data.main.temp * 9) / 5 + 32);
    temperatureNow.innerHTML = currentFahrenheit;
    let currentFahrenheitFeeling = Math.round(
      (response.data.main.feels_like * 9) / 5 + 32
    );
    temperatureFeeling.innerHTML =
      `feels like ` + currentFahrenheitFeeling + `°F`;
  }
  axios.get(apiUrl).then(getFahrenheit);
}
let fahrenheitLink = document.querySelector(`#temperatureF`);
fahrenheitLink.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#cityInput");
  cityName.innerHTML = `${inputCity.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric&appid=${apiKey}`;
  function getCelsius(response) {
    let currentCelsius = Math.round(response.data.main.temp);
    temperatureNow.innerHTML = currentCelsius;
    let currentCelsiusFeeling = Math.round(response.data.main.feels_like);
    temperatureFeeling.innerHTML = `feels like ` + currentCelsiusFeeling + `°C`;
  }
  axios.get(apiUrl).then(getCelsius);
}
let celsiusLink = document.querySelector(`#temperatureC`);
celsiusLink.addEventListener("click", showCelsius);
