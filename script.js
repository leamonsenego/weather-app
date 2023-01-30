/////////////////////////////////////////////////////// Date & Time

const currentDate = document.querySelector("#current-date");
let now = new Date();

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let time = now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");

  let formattedDate = `${day}, ${time}`;
  return formattedDate;
}

const todaydate = formatDate();
currentDate.innerHTML = todaydate;

//////////////////////////////////////////////////////// Search bar & API

const city = document.querySelector("#current-city");
const cityForm = document.querySelector("#search-form");

function search(city) {
  let apiKey = "1dbf926d3b4417bf379db7043bec1047";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  search(city);
}

search("Toulouse"); // On load aka what the user sees when opening the weather app

cityForm.addEventListener("submit", handleSubmit); // the user can search for any city

///////////////////////////////////////////// Weather API

function showWeatherConditions(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#temperature-value").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#clouds").innerHTML = Math.round(
    response.data.clouds.all
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}

/////////////////////////////////////////////// Celsius and Fahrenheit

const temperatureElement = document.querySelector(".temperature");
const temperatureValueElement = document.querySelector("#temperature-value");

let tempUnit = "celsius";

function changeUnit(tempUnitParam) {
  const currValue = Number.parseInt(temperatureValueElement.innerHTML, 10);

  const isCelsius = tempUnit === "celsius";

  switch (tempUnitParam) {
    case "celsius": {
      if (!isCelsius) {
        // calcul to celsius
        temperatureValueElement.innerHTML = Math.round(
          ((currValue - 32) * 5) / 9
        );
        tempUnit = "celsius";
      }
      break;
    }
    case "fahrenheit": {
      if (isCelsius) {
        // calcul to fahrenheit
        temperatureValueElement.innerHTML = Math.round(
          (currValue * 9) / 5 + 32
        );
        tempUnit = "fahrenheit";
      }
      break;
    }
    default:
      alert("Unknown");
  }
}
