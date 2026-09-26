// Read the event ID from the URL query string.
// Example: event.html?id=2
const params = new URLSearchParams(window.location.search);
const eventId = params.get('id');

// Get the HTML container where the event details will be displayed
const eventDetails = document.getElementById('event-details');


// --------------------------------------------------
// Check that an event ID exists in the URL
// --------------------------------------------------
if (!eventId) {

    eventDetails.innerHTML = '<p>Event not found.</p>';

} else {

    // --------------------------------------------------
    // Request the selected event from the API
    // --------------------------------------------------
    fetch(`http://localhost:3000/api/events/${eventId}`)

        .then(response => {

            // If the API does not return a successful response,
            // stop processing and move to the catch block
            if (!response.ok) {
                throw new Error('Event not found');
            }

            // Convert the API response into JavaScript data
            return response.json();
        })

        .then(event => {

            // --------------------------------------------------
            // Calculate fundraising progress
            // --------------------------------------------------
            const raisedAmount = Number(event.raised_amount);
            const goalAmount = Number(event.goal_amount);

            let progress = 0;

            if (goalAmount > 0) {
                progress = (raisedAmount / goalAmount) * 100;
            }

            // Prevent the progress bar from going over 100%
            progress = Math.min(progress, 100);


            // --------------------------------------------------
            // Display the selected event information on the page
            // --------------------------------------------------
            eventDetails.innerHTML = `
                <h2>${event.event_name}</h2>

                <p>
                    <strong>Category:</strong>
                    ${event.category_name}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${new Date(event.event_date).toLocaleDateString()}
                </p>

                <p>
                    <strong>Time:</strong>
                    ${event.event_time}
                </p>

                <p>
                    <strong>Location:</strong>
                    ${event.location}
                </p>

                <p>
                    <strong>Organisation:</strong>
                    ${event.organisation}
                </p>

                <p>
                    <strong>Purpose:</strong>
                    ${event.purpose}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${event.description}
                </p>

                <p>
                    <strong>Ticket Price:</strong>
                    $${Number(event.ticket_price).toFixed(2)}
                </p>


                <div class="progress-section">

                    <h3>Fundraising Progress</h3>

                    <p>
                        <strong>Raised:</strong>
                        $${raisedAmount.toFixed(2)}
                        of
                        $${goalAmount.toFixed(2)}
                    </p>

                    <div class="progress-bar">
                        <div
                            class="progress-fill"
                            style="width: ${progress}%;">
                        </div>
                    </div>

                    <p>
                        ${progress.toFixed(0)}% of goal reached
                    </p>

                </div>


                <button id="register-button">
                    Register
                </button>
            `;


            // --------------------------------------------------
            // Register button
            // For Assessment 2, registration is not implemented.
            // The button only displays the required message.
            // --------------------------------------------------
            document
                .getElementById('register-button')
                .addEventListener('click', () => {

                    alert(
                        'This feature is currently under construction.'
                    );

                });

        })

        // --------------------------------------------------
        // Display an error if the event cannot be loaded
        // --------------------------------------------------
        .catch(error => {

            console.error(
                'Error loading event details:',
                error
            );

            eventDetails.innerHTML =
                '<p>Unable to load event details.</p>';

        });
}