

// document.getElementById('getWeatherBtn').addEventListener('click', function() {
//   const city = document.getElementById('cityInput').value;
//   fetchWeather(city);
// });

// function fetchWeather(city) {
 
//    const apiKey = 'c88c041873c88fa8bc608b33404b1a02'; 
//    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
//   fetch(apiUrl)
//    .then(response => response.json())
//    .then(data => {
//       displayWeather(data);
//       console.log(data)
//   })
//   .catch(error => {
//       console.error('Error fetching weather:', error);
//   });
// }

// function displayWeather(data) {
//   var weatherInfoDiv = document.getElementById('weatherInfo');
//   weatherInfoDiv.innerHTML = `
//       <h2 class="text-xl mb-2">${data.name}, ${data.sys.country}</h2>
//       <p class="mb-1">Temperature: ${data.main.temp}°C</p>
//       <p class="mb-1">Weather: ${data.weather[0].description}</p>
//       <p class="mb-1">Humidity: ${data.main.humidity}%</p>
//       <p class="mb-1">Temp low: ${data.main.temp_min}%</p>
//       <p class="mb-1">temp high: ${data.main.temp_max}%</p>
//   `;
// }



// directions

function initMap() {
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 41.85, lng: -87.65 },
    disableDefaultUI: true,
  });

  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById("sidebar"));

  const control = document.getElementById("floating-panel");

  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  directionsService
    .route({
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}

window.initMap = initMap;