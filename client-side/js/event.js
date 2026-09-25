const params = new URLSearchParams(window.location.search);
const eventId = params.get('id');

const eventDetails = document.getElementById('event-details');

if (!eventId) {
    eventDetails.innerHTML = '<p>Event not found.</p>';
} else {
    fetch(`http://localhost:3000/api/events/${eventId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Event not found');
            }

            return response.json();
        })
        .then(event => {
            eventDetails.innerHTML = `
                <h2>${event.event_name}</h2>

                <p><strong>Category:</strong> ${event.category_name}</p>
                <p><strong>Date:</strong> ${new Date(event.event_date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> ${event.event_time}</p>
                <p><strong>Location:</strong> ${event.location}</p>

                <p><strong>Organisation:</strong> ${event.organisation}</p>
                <p><strong>Purpose:</strong> ${event.purpose}</p>

                <p><strong>Description:</strong> ${event.description}</p>

                <p><strong>Ticket Price:</strong> $${event.ticket_price}</p>

                <p><strong>Goal:</strong> $${event.goal_amount}</p>
                <p><strong>Raised:</strong> $${event.raised_amount}</p>

                <button id="register-button">Register</button>
            `;

            document.getElementById('register-button')
                .addEventListener('click', () => {
                    alert('This feature is currently under construction.');
                });
        })
        .catch(error => {
            console.error(error);
            eventDetails.innerHTML = '<p>Unable to load event details.</p>';
        });
}