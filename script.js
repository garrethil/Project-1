let coords;
let date1;
let dateDifference;

document.addEventListener('DOMContentLoaded', function () {
  const saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', saveEvent);

  // Load and display events when the page loads
  displayEvents();
});

let dateInput = document.getElementById('eventTime');
dateInput.addEventListener('change', getDateDifference);

function getDateDifference() {
  const today = new Date();
const options1 = { 
  month: '2-digit', 
  day: '2-digit', 
  year: 'numeric' 
};

const formattedDate = today.toLocaleDateString(undefined, options1);


let text = document.getElementById('eventTime').value;
const eventDate = new Date(text);
const options2 = { day: '2-digit', month: '2-digit', year: 'numeric' };
const formattedDate2 = eventDate.toLocaleDateString("en-US", options2);


let date1 = new Date(formattedDate);
let date2 = new Date(formattedDate2);
 
// To calculate the time difference of two dates
let Difference_In_Time = date2.getTime() - date1.getTime();
 
// To calculate the no. of days between two dates
let Difference_In_Days = 
    Math.round(Difference_In_Time / (1000 * 3600 * 24));

dateDifference = Difference_In_Days - 1;
}


function saveEvent() {
  // Get input values
  const eventName = document.getElementById('eventName').value;
  const eventTime = document.getElementById('eventTime').value;
  const eventAddress = document.getElementById('eventAddress').value;
  
  const startAddress = document.getElementById('startAddress').value;

  // Create an event 
  const event = {
      eventName,
      eventTime,
      location: eventAddress,
      startingLocation: startAddress,
      weather: '',
      directions: '',
      coordinates: coords,
      daysAway: dateDifference
  };
  console
  // Save to local storage
  let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
  events.push(event);
  localStorage.setItem('events', JSON.stringify(events));
 
  // Display events
  displayEvents();

  // // Clear input fields
  clearInputs();


}

// auto Complete
let autocomplete; 
let autocomplete1;
    function initAutocomplete() {
      autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('startAddress'),
        {
          types: ['address'],
          componentRestrictions: {'country' : ['us', 'ca']},
          fields: ['place_id', 'geometry', 'name']
        });

        autocomplete1 = new google.maps.places.Autocomplete(
        document.getElementById('eventAddress'),
        {
          types: ['address'],
          componentRestrictions: {'country' : ['us', 'ca']},
          fields: ['place_id', 'geometry', 'name']
        });
        autocomplete1.addListener('place_changed', onPlaceChanged);
    }


    function onPlaceChanged() {
      var place = autocomplete1.getPlace();

     if (!place.geometry) {
      console.log(error);
     }else {
      fetch('https://maps.googleapis.com/maps/api/geocode/json?place_id=' + place.place_id + '&key=AIzaSyC0mXtBg2BJhA4sLDmoC-mJf1vN5XzhRNw')
      .then(response => response.json())
      .then(data => {
      //  get coordinates from data returned
        coords = data.results[0].geometry.location;
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
     }}


function displayEvents() {
  const events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
  const eventsTableBody = document.getElementById('eventsTable').getElementsByTagName('tbody')[0];

  // Clear existing table body content
  eventsTableBody.innerHTML = '';

  // Sort events by date
  events.sort((a, b) => new Date(b.eventTime) - new Date(a.eventTime));

  // Add each event to the table
  events.forEach(event => {
      let row = eventsTableBody.insertRow();
     //link to a new tab for event detail 
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
