

document.getElementById('getWeatherBtn').addEventListener('click', function() {
  const city = document.getElementById('cityInput').value;
  fetchWeather(city);
});

function fetchWeather(city) {
 
   const apiKey = 'c88c041873c88fa8bc608b33404b1a02'; 
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
  fetch(apiUrl)
   .then(response => response.json())
   .then(data => {
      displayWeather(data);
      console.log(data)
  })
  .catch(error => {
      console.error('Error fetching weather:', error);
  });
}

function displayWeather(data) {
  var weatherInfoDiv = document.getElementById('weatherInfo');
  weatherInfoDiv.innerHTML = `
      <h2 class="text-xl mb-2">${data.name}, ${data.sys.country}</h2>
      <p class="mb-1">Temperature: ${data.main.temp}°C</p>
      <p class="mb-1">Weather: ${data.weather[0].description}</p>
      <p class="mb-1">Humidity: ${data.main.humidity}%</p>
      <p class="mb-1">Temp low: ${data.main.temp_min}%</p>
      <p class="mb-1">temp high: ${data.main.temp_max}%</p>
  `;
}
