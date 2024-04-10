const getLocationBtn = document.querySelector("#getLocationBtn");
const loading = document.querySelector("#loading");
const locations = document.querySelector("#location");
const date1 = document.querySelector("#date1");
const condition1 = document.querySelector("#condition1");
const icon1 = document.querySelector("#icon1");
const temp1 = document.querySelector("#temp1");
const date2 = document.querySelector("#date2");
const condition2 = document.querySelector("#condition2");
const icon2 = document.querySelector("#icon2");
const temp2 = document.querySelector("#temp2");
const date3 = document.querySelector("#date3");
const condition3 = document.querySelector("#condition3");
const icon3 = document.querySelector("#icon3");
const temp3 = document.querySelector("#temp3");

const getWeatherData = async function () {
  try {
    loading.src = "./ZKZg.gif";
    const input = locations.value;
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=ed6369e03c1a4bf4bac84950240304&q=${input}&days=3&aqi=no&alerts=no`
    );
    const weatherData = await response.json();

    loading.src = "";
    if (weatherData.error) {
      console.log(weatherData.error);
      throw weatherData;
    } else
      [city, region, country, forecast1, forecast2, forecast3] = [
        weatherData.location.name,
        weatherData.location.region,
        weatherData.location.country,
        weatherData.forecast.forecastday[0],
        weatherData.forecast.forecastday[1],
        weatherData.forecast.forecastday[2],
      ];

    return [city, region, country, forecast1, forecast2, forecast3];
  } catch (error) {
    alert(error.error.message);
    locations.value = "";
  }
};

const displayData = function (data) {
  console.log(data);
  const cityName = document.querySelector("#name");
  const countryName = document.querySelector("#country");
  cityName.textContent = `${city}, ${region}`;
  countryName.textContent = `${country}`;
  date1.textContent = `${forecast1.date}`;
  condition1.textContent = `${forecast1.day.condition.text}`;
  icon1.src = `https:` + `${forecast1.day.condition.icon}`;
  temp1.textContent = `${forecast1.day.mintemp_c} ... ${forecast1.day.maxtemp_c}°C`;

  date2.textContent = `${forecast2.date}`;
  condition2.textContent = `${forecast2.day.condition.text}`;
  icon2.src = `https:` + `${forecast1.day.condition.icon}`;
  temp2.textContent = `${forecast2.day.mintemp_c} ... ${forecast2.day.maxtemp_c}°C`;

  date3.textContent = `${forecast3.date}`;
  condition3.textContent = `${forecast3.day.condition.text}`;
  icon3.src = `https:` + `${forecast3.day.condition.icon}`;
  temp3.textContent = `${forecast3.day.mintemp_c} ... ${forecast3.day.maxtemp_c}°C`;
};

getLocationBtn.addEventListener("click", () =>
  getWeatherData().then(displayData)
);

getWeatherData().then(displayData);
