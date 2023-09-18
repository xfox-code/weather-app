//current-weather apparent_temperature_max apparent_temperature_min weathercode daily=weathercode,apparent_temperature_max,apparent_temperature_min

const queryInput = document.querySelector(".query-input");
const cityInput = document.querySelector(".city-input");
const countryInput = document.querySelector(".country-input");
const searchButton = document.querySelector(".search-button");
const addressParagraph = document.querySelector(".address-text");
const weatherTextMin = document.querySelector(".weather-text-min");
const weatherTextCurrent = document.querySelector(".weather-text-current");
const weatherTextMax = document.querySelector(".weather-text-max");
const body = document.querySelector("body");

let locationData;
let weatherData;

searchButton.addEventListener("click", async () => {
  let query = queryInput.value;
  let city = cityInput.value;
  let country = countryInput.value;
  let geolocationData;

  try {
    let response = await fetch(
      `https://geocode.maps.co/search?q=${query}&city=${city}&country=${country}`
    );
    geolocationData = await response.json();
  } catch (err) {
    console.log("geolocation fetch did not work", err);
  }
  addressParagraph.innerHTML = geolocationData[0]["display_name"];
  try {
    let response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${geolocationData[0]["lat"]}&longitude=${geolocationData[0]["lon"]}&daily=weathercode,apparent_temperature_max,apparent_temperature_min&current_weather=true&forecast_days=1`
    );
    weatherData = await response.json();
  } catch {
    console.log("weather fetch did not work", err);
  }
  console.log(geolocationData);
  console.log(weatherData["daily"]["weathercode"][0]);
  weatherTextMin.innerHTML = `${weatherData["daily"]["apparent_temperature_min"]["0"]} °C`;
  weatherTextCurrent.innerHTML = `${weatherData["current_weather"]["temperature"]} °C`;
  weatherTextMax.innerHTML = `${weatherData["daily"]["apparent_temperature_max"]["0"]} °C`;
});
