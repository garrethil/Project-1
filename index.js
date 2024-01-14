document.addEventListener('DOMContentLoaded', function () {
    const urlString = new URLSearchParams(window.location.search);
    const eventId = urlString.get('eventId');

    if (eventId !== null) {
        displayEventDetails(eventId);
    }
});

function displayEventDetails(eventId) {
    const events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
    const event = events.find(event => event.eventName === eventId);
    if (event) {
        
        document.getElementById('detailEventName').innerText = event.eventName;
        document.getElementById('detailEventTime').innerText = new Date(event.eventTime).toLocaleString();
        document.getElementById('detailEventAddress').innerText = event.location;
        document.getElementById('detailStartAddress').innerText = event.startingLocation;
         
        document.getElementById('detailDirections').innerText = event.directions; 
    } else {
        
        document.getElementById('eventDetail').innerHTML = '<p>Event not found.</p>';
    }
}

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
var weatherInfoDiv = document.getElementById('detailWeather');
weatherInfoDiv.innerHTML = `
<h2 class="text-xl mb-2">${data.name}, ${data.sys.country}</h2>
<p class="mb-1">Temperature: ${data.main.temp}°C</p>
<p class="mb-1">Weather: ${data.weather[0].description}</p>
<p class="mb-1">Humidity: ${data.main.humidity}%</p>
<p class="mb-1">Temp low: ${data.main.temp_min}%</p>
<p class="mb-1">temp high: ${data.main.temp_max}%</p>
`;
}

function weather() {   
const city = document.getElementById('detailEventAddress').innerText;
fetchWeather(city);
}



// Call the weather function when the page loads
window.onload = function() {
weather();
};

// Map function

function initMap() {
const directionsRenderer = new google.maps.DirectionsRenderer();
const directionsService = new google.maps.DirectionsService();
const map = new google.maps.Map(document.getElementById("map"), {
disableDefaultUI: true,
zoom: 7,
});

directionsRenderer.setMap(map);
directionsRenderer.setPanel(document.getElementById("sidebar"));

const control = document.getElementById("floating-panel");

map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

const onChangeHandler = function () {
calculateAndDisplayRoute(directionsService, directionsRenderer);
};

onChangeHandler();
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {

    const urlString = new URLSearchParams(window.location.search);
    const eventId = urlString.get('eventId');


const events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
const event = events.find(event => event.eventName === eventId);
const start = event.startingLocation;
const end = event.location;

const selectedMode = document.getElementById("mode").value;


directionsService
.route({
origin: start,
destination: end,
travelMode: google.maps.TravelMode[selectedMode],
})
.then((response) => {
directionsRenderer.setDirections(response);
})
.catch((e) => window.alert("Directions request failed due to " + status));
}

window.initMap = initMap;