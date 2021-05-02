import { getLocalStorage, setLocalStorage } from "./constants.js";

const API_KEY = "0433d0d3804bb5d996d0d4dd304fe727";
const COORDS = "coords";
const $weather = document.querySelector(".weather");

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    const temperature = json.main.temp;
    const place = json.name;
    $weather.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png" />
      <span>${Math.floor(temperature - 273.15)}°</span>
    `;
  });
}

function saveCoords(coordsItem) {
  setLocalStorage(COORDS, coordsItem);
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsItem = {
    latitude,
    longitude
  }
  saveCoords(coordsItem);
  getWeather(latitude, longitude);
}

function handleGeoError(position) {

}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = getLocalStorage(COORDS);

  if (loadedCoords) {
    getWeather(loadedCoords.latitude, loadedCoords.longitude);
  } else {
    askForCoords();
  }
}

export { loadCoords };