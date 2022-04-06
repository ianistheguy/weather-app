// UI Elements
const iconEl = document.querySelector('.icon');
const container = document.getElementById('container');
const infoEl = document.getElementById('info');
const cityEl = document.getElementById('city');
const tempEl = document.getElementById('temp');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const speedEl = document.getElementById('wind');
const searchEl = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');

// Global search function
const searchFn = () => {
  const [city, state, country] = searchEl.value.split(',');

  if (searchEl.value === '') {
    const errorMsg = 'Field cannot be empty!';
    alert(errorMsg);
  } else {
    Weather.fetchWeather(city, state, country);
    searchEl.value = '';
    infoEl.style.display = 'none';
  }
};

// Global Weather Class
class Weather {
  static apiKey = '5badc4bb20c24cb64d5143af220b3bbc';

  static fetchWeather(city, state, country = '') {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&units=imperial&appid=${this.apiKey}`
    )
      .then((response) => response.json())
      .then((data) => console.log(this.displayWeather(data)));
  }

  static displayWeather(data) {
    const { name } = data;
    const { country } = data.sys;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    cityEl.innerText = `Weather in ${name}, ${country}`;
    iconEl.src = `https://openweathermap.org/img/wn/${icon}.png`;
    descriptionEl.innerText = description;
    humidityEl.innerText = `Humidity: ${humidity}%`;
    tempEl.innerText = `${Math.round(temp)}°F`;
    speedEl.innerText = `Wind Speed: ${Number(speed.toFixed(2))} mph`;

    console.log(data);
    //console.log(name, icon, description, temp, humidity, speed);
  }
}

// Search event when button is clicked
searchBtn.addEventListener('click', searchFn);
