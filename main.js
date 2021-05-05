console.log = function () {}; //hides console log data
const inputTxt = document.querySelector(".inputTxt");
const button = document.querySelector(".btn");
let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let locationIcon = document.querySelector(".weather-icon");
let temperatureHumidity = document.querySelector(".temperature-humidity");
let temperatureFeel = document.querySelector(".temperature-feel");

inputTxt.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector(".btn").click();
  }
});
//gives the function of using ENTER key onto input field

button.addEventListener("click", () => {
  //when clicked search button data will be displayed
  const cityInput = inputTxt.value;
  //const proxy = "https://cors-anywhere.herokuapp.com/";
  const key = "74fcc9d799e5497435b5375fc69ebd01"; //hides the key
  const url = "https://api.openweathermap.org/data/2.5/weather?"; //hides the URL of API
  const api = `${url}q=${cityInput}&units=metric&appid=${key}`; // The final URL from where the data is being extracted.
  fetch(api) // fetch funtion will get the data from the API
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      const { temp, humidity, feels_like } = data.main; //gets the exact data from the API.
      const { description, icon } = data.weather[0];
      const name = data.name;

      temperatureDegree.textContent = `Temp: ${temp}`; //Links the data to the HTML file.
      temperatureDescription.textContent = `Weather: ${description}`;
      locationTimezone.textContent = name;
      locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
      temperatureHumidity.textContent = `Humidity: ${humidity}`;
      temperatureFeel.textContent = `Feels Like: ${feels_like}`;
    });
});

window.addEventListener("load", () => {
  let lon;
  let lat;
  //console.log = function () {}; //hides console log data
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let locationIcon = document.querySelector(".weather-icon");
  let temperatureHumidity = document.querySelector(".temperature-humidity");
  let temperatureFeel = document.querySelector(".temperature-feel");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const url = "https://api.openweathermap.org/data/2.5/weather?";
      const key = "74fcc9d799e5497435b5375fc69ebd01";
      const api = `${url}lat=${lat}&lon=${lon}&units=metric&appid=${key}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp, humidity, feels_like } = data.main; //gets the exact data from the API.
          const { description, icon } = data.weather[0];
          const name = data.name;

          temperatureDegree.textContent = `Temp: ${temp}`; //Links the data to the HTML file.
          temperatureDescription.textContent = `Weather: ${description}`;
          locationTimezone.textContent = name;
          locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
          temperatureHumidity.textContent = `Humidity: ${humidity}`;
          temperatureFeel.textContent = `Feels Like: ${feels_like}`;
        });
    });
  } 
});
