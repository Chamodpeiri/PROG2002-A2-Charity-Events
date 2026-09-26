// Request the list of upcoming charity events from the API
fetch('http://localhost:3000/api/events')

    // Convert the API response into JavaScript data
    .then(response => response.json())

    .then(events => {

        // Get the HTML container where the events will be displayed
        const container = document.getElementById('events-container');

        // Remove the temporary "Loading events..." message
        container.innerHTML = '';

        // Loop through each event returned by the API
        events.forEach(event => {

            // Create a new HTML element for each event
            const eventCard = document.createElement('div');

            // Add the event information to the page
            eventCard.innerHTML = `
    <img
        src="images/${event.image}"
        alt="${event.event_name}"
        class="event-image"
    >

    <h3>${event.event_name}</h3>

    <p>
        <strong>Category:</strong>
        ${event.category_name}
    </p>

    <p>
        <strong>Location:</strong>
        ${event.location}
    </p>

    <p>
        <strong>Date:</strong>
        ${new Date(event.event_date).toLocaleDateString()}
    </p>

    <a href="event.html?id=${event.event_id}">
        View Details
    </a>
`;

            // Add the completed event card to the page
            container.appendChild(eventCard);
        });
    })

    // Display an error message if the API request fails
    .catch(error => {
        console.error('Error loading events:', error);

        document.getElementById('events-container').innerHTML =
            '<p>Unable to load events.</p>';
    });