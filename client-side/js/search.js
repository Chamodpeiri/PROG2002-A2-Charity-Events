const categorySelect = document.getElementById('category');
const searchForm = document.getElementById('search-form');
const clearButton = document.getElementById('clear-filters');
const resultsContainer = document.getElementById('search-results');
const message = document.getElementById('message');

fetch('http://localhost:3000/api/categories')
    .then(response => response.json())
    .then(categories => {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.category_id;
            option.textContent = category.category_name;
            categorySelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error loading categories:', error);
    });

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const category = document.getElementById('category').value;

    if (!date && !location && !category) {
        message.textContent = 'Please select at least one search criterion.';
        resultsContainer.innerHTML = '';
        return;
    }

    const params = new URLSearchParams();

    if (date) {
        params.append('date', date);
    }

    if (location) {
        params.append('location', location);
    }

    if (category) {
        params.append('category', category);
    }

    fetch(`http://localhost:3000/api/events/search?${params.toString()}`)
        .then(response => response.json())
        .then(events => {
            resultsContainer.innerHTML = '';
            message.textContent = '';

            if (events.length === 0) {
                message.textContent = 'No matching events found.';
                return;
            }

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

                resultsContainer.appendChild(eventCard);
            });
        })
        .catch(error => {
            console.error('Search error:', error);
            message.textContent = 'Unable to search events.';
        });
});

clearButton.addEventListener('click', () => {
    searchForm.reset();
    resultsContainer.innerHTML = '';
    message.textContent = '';
});