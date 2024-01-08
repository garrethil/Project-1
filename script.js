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
    const eventCity = document.getElementById('eventCity').value;
    const eventProvince = document.getElementById('eventProvince').value;
    const startCity = document.getElementById('startCity').value;
    const startProvince = document.getElementById('startProvince').value;

    // Create an event object
    const event = {
        eventName,
        eventTime,
        location: eventCity + ', ' + eventProvince,
        startingLocation: startCity + ', ' + startProvince,
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
            <td>${event.eventName}</td>
            <td>${event.location}</td>
            <td>${event.weather}</td>
            <td>${event.directions}</td>
            <td>${new Date(event.eventTime).toLocaleString()}</td>
        `;
    });
}

function clearInputs() {
    document.getElementById('eventName').value = '';
    document.getElementById('eventTime').value = '';
    document.getElementById('eventCity').value = '';
    document.getElementById('eventProvince').value = '';
    document.getElementById('startCity').value = '';
    document.getElementById('startProvince').value = '';
}

