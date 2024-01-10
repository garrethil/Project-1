

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

document.addEventListener('DOMContentLoaded', function () {
  const saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', saveEvent);

  // Load and display events when the page loads
  displayEvents();
});

function saveEvent() {
  // Get input values
  const eventName = document.getElementById('eventName').value;
  const eventTime = document.getElementById('eventTime').value;
  const eventAddress = document.getElementById('eventAddress').value;
  
  const startAddress = document.getElementById('startAddress').value;
  

  // Create an event object
  const event = {
      eventName,
      eventTime,
      location: eventAddress,
      startingLocation: startAddress,
      weather: '', // Placeholder for weather data
      directions: '' // Placeholder for directions data
  };

  // Save to local storage
  let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
  events.push(event);
  localStorage.setItem('events', JSON.stringify(events));

  // Display events
  displayEvents();

  // Clear input fields
  clearInputs();
}

function displayEvents() {
  const events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
  const eventsTableBody = document.getElementById('eventsTable').getElementsByTagName('tbody')[0];

  // Clear existing rows
  eventsTableBody.innerHTML = '';

  // Sort events by date
  events.sort((a, b) => new Date(b.eventTime) - new Date(a.eventTime));

  // Add each event to the table
  events.forEach(event => {
      let row = eventsTableBody.insertRow();
      row.innerHTML = `
      <td><a href="eventDetails.html?eventId=${encodeURIComponent(event.eventName)}">${event.eventName}</a></td>
         
      `;
  });
}

function clearInputs() {
  document.getElementById('eventName').value = '';
  document.getElementById('eventTime').value = '';
  document.getElementById('eventAddress').value = '';
  
  document.getElementById('startAddress').value = '';
  
}