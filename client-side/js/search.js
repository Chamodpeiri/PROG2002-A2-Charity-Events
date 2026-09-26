// Get the main HTML elements used on the Search Events page
const categorySelect = document.getElementById('category');
const searchForm = document.getElementById('search-form');
const clearButton = document.getElementById('clear-filters');
const resultsContainer = document.getElementById('search-results');
const message = document.getElementById('message');


// --------------------------------------------------
// Load event categories from the API
// These categories are added dynamically to the
// category dropdown on the Search Events page.
// --------------------------------------------------
fetch('http://localhost:3000/api/categories')
    .then(response => response.json())

    .then(categories => {
        // Create one <option> element for each category
        categories.forEach(category => {
            const option = document.createElement('option');

            option.value = category.category_id;
            option.textContent = category.category_name;

            categorySelect.appendChild(option);
        });
    })

    // Display an error in the console if categories cannot be loaded
    .catch(error => {
        console.error('Error loading categories:', error);
    });


// --------------------------------------------------
// Handle the Search Events form submission
// --------------------------------------------------
searchForm.addEventListener('submit', (event) => {

    // Prevent the browser from reloading the page
    event.preventDefault();

    // Read the values entered or selected by the user
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const category = document.getElementById('category').value;


    // --------------------------------------------------
    // Validation
    // Require the user to choose at least one search
    // criterion before sending the API request.
// --------------------------------------------------
    if (!date && !location && !category) {
        message.textContent =
            'Please select at least one search criterion.';

        resultsContainer.innerHTML = '';
        return;
    }


    // Create the query string that will be sent to the API
    const params = new URLSearchParams();

    // Add the date parameter only if a date was selected
    if (date) {
        params.append('date', date);
    }

    // Add the location parameter only if a location was entered
    if (location) {
        params.append('location', location);
    }

    // Add the category parameter only if a category was selected
    if (category) {
        params.append('category', category);
    }


    // --------------------------------------------------
    // Send the selected search criteria to the API
    // Example:
    // /api/events/search?location=Colombo&category=1
    // --------------------------------------------------
    fetch(`http://localhost:3000/api/events/search?${params.toString()}`)

        .then(response => response.json())

        .then(events => {

            // Clear previous search results and messages
            resultsContainer.innerHTML = '';
            message.textContent = '';


            // Show a message when the API returns no matching events
            if (events.length === 0) {
                message.textContent = 'No matching events found.';
                return;
            }


            // Display each matching event on the page
            events.forEach(event => {

                // Create a new container for the event
                const eventCard = document.createElement('div');

                // Insert the event information into the page
                eventCard.innerHTML = `
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

                    <!--
                        Pass the selected event ID to the
                        Event Details page using a query string
                    -->
                    <a href="event.html?id=${event.event_id}">
                        View Details
                    </a>

                    <hr>
                `;

                // Add the event card to the search results section
                resultsContainer.appendChild(eventCard);
            });
        })

        // Display an error message if the search request fails
        .catch(error => {
            console.error('Search error:', error);

            message.textContent =
                'Unable to search events.';
        });
});


// --------------------------------------------------
// Clear Filters button
// Resets the form and removes current results/messages
// using basic DOM manipulation.
// --------------------------------------------------
clearButton.addEventListener('click', () => {
    searchForm.reset();
    resultsContainer.innerHTML = '';
    message.textContent = '';
});