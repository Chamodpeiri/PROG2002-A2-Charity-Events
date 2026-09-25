fetch('http://localhost:3000/api/events')
    .then(response => response.json())
    .then(events => {
        const container = document.getElementById('events-container');

        container.innerHTML = '';

        events.forEach(event => {
            const eventCard = document.createElement('div');

            eventCard.innerHTML = `
                <h3>${event.event_name}</h3>
                <p><strong>Category:</strong> ${event.category_name}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Date:</strong> ${new Date(event.event_date).toLocaleDateString()}</p>
                <a href="event.html?id=${event.event_id}">View Details</a>
                <hr>
            `;

            container.appendChild(eventCard);
        });
    })
    .catch(error => {
        console.error('Error loading events:', error);

        document.getElementById('events-container').innerHTML =
            '<p>Unable to load events.</p>';
    });