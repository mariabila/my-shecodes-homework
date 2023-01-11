//homework week 3
//look at notepad
//homework week 4
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

function checkWeather(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#cityInput");
  cityName.innerHTML = `${inputCity.value} <i class="fa-regular fa-face-smile"></i>`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric&appid=${apiKey}`;

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    temperatureNow.innerHTML = temperature;
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

//Temperature Convertion:
//let currentCelsius = 16;
//let currentFahrenheit = Math.round((currentCelsius * 9) / 5 + 32);

//function showFahrenheit(event) {
//  event.preventDefault();
//  let tempNow = document.querySelector("#temperatureNow");
//  tempNow.innerHTML = currentFahrenheit;
//}
//let measureF = document.querySelector("#temperatureF");
//measureF.addEventListener("click", showFahrenheit);

//function showCelcius(event) {
//event.preventDefault();
//let tempNow = document.querySelector("#temperatureNow");
//tempNow.innerHTML = currentCelsius;
//}
//let measureC = document.querySelector("#temperatureC");
//measureC.addEventListener("click", showCelcius);
