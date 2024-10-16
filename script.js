const KEY = "cf765e98cb19438f93985258241610";

const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");
const weatherInfoSection = document.querySelector(".weather-info");
const city = document.querySelector(".country-txt");

searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});
cityInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

async function getFetchData(city) {
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${city}&days=4&aqi=no&alerts=no`;
  const response = await fetch(apiUrl);
  return response.json();
}

async function updateWeatherInfo(city) {
  const weatherData = await getFetchData(city);
  if (weatherData.location) {
    console.log(weatherData);
    const CITY = weatherData.location.name;
    console.log(CITY);
    city.innerHTML = CITY;
    showDis(weatherInfoSection);
  } else {
    showDis(notFoundSection);
  }
}

function showDis(section) {
  [weatherInfoSection, searchCitySection, notFoundSection].forEach(
    (section) => (section.style.display = "none")
  );
  section.style.display = "flex";
}
