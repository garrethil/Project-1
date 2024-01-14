let coords;





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
      directions: '', // Placeholder for directions data
      coordinates: coords
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






// auto Complete
let autocomplete; 
    function initAutocomplete() {
      autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('startAddress'),
        {
          types: ['address'],
          componentRestrictions: {'country' : ['us', 'ca']},
          fields: ['place_id', 'geometry', 'name']
        });

        autocompleteUse = new google.maps.places.Autocomplete(
        document.getElementById('eventAddress'),
        {
          types: ['address'],
          componentRestrictions: {'country' : ['us', 'ca']},
          fields: ['place_id', 'geometry', 'name']
        });
        autocompleteUse.addListener('place_changed', onPlaceChanged);
    }


      function onPlaceChanged() {
        var place = autocompleteUse.getPlace();

       if (!place.geometry) {
        console.log(error);
       }else {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?place_id=' + place.place_id + '&key=AIzaSyAMk_S2bD3RDf-uQxRTBMIdTX8_6jJ5GgY')
        .then(response => response.json())
        .then(data => {
        //  get coordinates from data returned
          coords = data.results[0].geometry.location
        })
        .catch(error => {
          // Handle any errors
          console.error(error);
        });
       }}

      

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

