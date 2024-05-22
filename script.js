document.getElementById('weather-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = document.getElementById('city').value;
  const apiKey = '3d0c5fbbe11a61d18e158815c6729f26';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          if (data.cod !== 200) {
              showError(data.message);
              return;
          }
          displayWeather(data);
      })
      .catch(error => {
          showError("An error occurred while fetching the weather data.");
      });
});

function kelvinToCelsiusFahrenheit(kelvin) {
  const celsius = kelvin - 273.15;
  const fahrenheit = (celsius * 9/5) + 32;
  return { celsius, fahrenheit };
}

function displayWeather(data) {
  const { celsius, fahrenheit } = kelvinToCelsiusFahrenheit(data.main.temp);
  const { celsius: feelsLikeCelsius, fahrenheit: feelsLikeFahrenheit } = kelvinToCelsiusFahrenheit(data.main.feels_like);
  const humidity = data.main.humidity;
  const description = data.weather[0].description;
  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  const weatherInfo = `
      <h2>Weather in ${data.name}</h2>
      <p>Temperature: ${celsius.toFixed(2)}°C / ${fahrenheit.toFixed(2)}°F</p>
      <p>Feels like: ${feelsLikeCelsius.toFixed(2)}°C / ${feelsLikeFahrenheit.toFixed(2)}°F</p>
      <p>Humidity: ${humidity}%</p>
      <p>Description: ${description}</p>
      <p>Sunrise: ${sunrise}</p>
      <p>Sunset: ${sunset}</p>
  `;
  document.getElementById('weather-info').innerHTML = weatherInfo;
  document.getElementById('error').textContent = '';
}

function showError(message) {
  document.getElementById('error').textContent = message;
  document.getElementById('weather-info').innerHTML = '';
}
