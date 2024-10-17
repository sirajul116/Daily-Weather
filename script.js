const KEY = "cf765e98cb19438f93985258241610";

const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");
const weatherInfoSection = document.querySelector(".weather-info");

const cityNameElement = document.querySelector(".country-txt");
const dateElement = document.querySelector(".current-date-txt");
const tempElement = document.querySelector(".temp-text");
const conditionElement = document.querySelector(".condition-txt");
const weatherSummaryImg = document.querySelector(".weather-summary-img");

const forecastItemsContainer = document.querySelectorAll(".forecast-item");

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
  try {
    const weatherData = await getFetchData(city);
    if (weatherData.location) {
      console.log(weatherData);

      const CITY = weatherData.location.name;
      const DATE = new Date(weatherData.location.localtime).toDateString();
      const TEMP = weatherData.current.temp_c;
      const CONDITION = weatherData.current.condition.text;
      const ICON = weatherData.current.condition.icon;

      cityNameElement.innerHTML = CITY;
      dateElement.innerHTML = DATE;
      tempElement.innerHTML = `${TEMP}°C`;
      conditionElement.innerHTML = CONDITION;
      weatherSummaryImg.src = ICON;

      const forecastDays = weatherData.forecast.forecastday;

      forecastDays.forEach((day, index) => {
        if (forecastItemsContainer[index]) {
          const forecastDate = new Date(day.date).toDateString();
          const avgTemp = day.day.avgtemp_c;
          const forecastIcon = day.day.condition.icon;

          forecastItemsContainer[index].querySelector(
            ".forecast-item-date"
          ).innerHTML = forecastDate;
          forecastItemsContainer[index].querySelector(
            ".forecast-item-temp"
          ).innerHTML = `${avgTemp}°C`;
          forecastItemsContainer[index].querySelector(
            ".forecast-item-img"
          ).src = forecastIcon;
        }
      });

      showDis(weatherInfoSection);
    } else {
      showDis(notFoundSection);
    }
  } catch (error) {
    showDis(notFoundSection);
  }
}

function showDis(section) {
  [weatherInfoSection, searchCitySection, notFoundSection].forEach(
    (section) => (section.style.display = "none")
  );
  section.style.display = "flex";
}
