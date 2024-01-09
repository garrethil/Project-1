var lon = 0
var lat = 0
document.getElementById('getWeatherBtn').addEventListener('click', function() {
  const city = document.getElementById('cityInput').value;
  if (city !== " " && city !== ""){
  fetchWeather(city);
  }
});

function fetchWeather(city) {
  
 
   var apiKey = 'c88c041873c88fa8bc608b33404b1a02'; 
   var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
   
  fetch(apiUrl)
  .then((response) => {
     if (!response.ok) throw new Error(response.statusText);
      return response.json()
  })
     
  .then(data => { 
     displayWeather(data); 
  })
  .catch(error => {    
     var error = 'Error fetching city weather, or no such city exist'
      displayError(error)
    
  });
}

function displayWeather(data) {
  lat = data.coord.lat
  lon = data.coord.lon
  var d_name = data.name +', '+ data.sys.country;
  
  var d_name = data.name
  var d_name = data.name
  var d_name = data.name
  var weatherInfoDiv = document.getElementById('weatherInfo');
  weatherInfoDiv.innerHTML = `
      <h2 class="text-xl mb-2">${data.name}, ${data.sys.country}</h2>
      <p class="mb-1">Temperature: ${data.main.temp}°C</p>
      <p class="mb-1">Weather: ${data.weather[0].description}</p>
      <p class="mb-1">Humidity: ${data.main.humidity}%</p>
      <p class="mb-1">Temp low: ${data.main.temp_min}%</p>
      <p class="mb-1">temp high: ${data.main.temp_max}%</p>
  `;
  
//   var map = L.map('map').setView([lat, lon], 13);

//   // Add OpenStreetMap layer
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(map);
  
//  // Add a marker to the map
//   L.marker([lat, lon]).addTo(map)
//     //  .bindPopup(' Here')
//       .openPopup();
}

// Function to display error modal
function displayError(errorMessage) {
  
  var modal = document.getElementById('errorModal');
  var modalContent = document.getElementById('errorMessage');

  // Set error message
  modalContent.textContent = errorMessage;

  // Show modal
  modal.classList.remove('hidden');
  
}

// Function to close error modal
document.getElementById('closeModalBtn').addEventListener('click', function() {

  var modal = document.getElementById('errorModal');
  var cityIN = document.getElementById('cityInput')
  var weatherInfoDiv = document.getElementById('weatherInfo');
  weatherInfoDiv.innerHTML = " "
  modal.classList.add('hidden');
   location.reload();
});

// Initialize the map


