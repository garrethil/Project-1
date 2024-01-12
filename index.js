const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('eventId');
const travelMode = document.getElementById("mode");

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('eventId');

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
      document.getElementById('detailWeather').innerText = event.weather; // Placeholder value
      document.getElementById('detailDirections').innerText = event.directions; // Placeholder value

      // conver address to coordinates 
      geocoder = new google.maps.Geocoder();
    var address = document.getElementById("detailEventAddress").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {

      console.log("Latitude: "+results[0].geometry.location.lat());
      console.log("Longitude: "+results[0].geometry.location.lng());
      } 

      else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  } else {
      // Handle invalid eventId
      document.getElementById('eventDetail').innerHTML = '<p>Invalid event ID. Please select an event from the <a href="index.html">Events List</a>.</p>';
  }
}


// Map function

function initMap() {
const directionsRenderer = new google.maps.DirectionsRenderer();
const directionsService = new google.maps.DirectionsService();
const map = new google.maps.Map(document.getElementById("map"), {
  disableDefaultUI: true,
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