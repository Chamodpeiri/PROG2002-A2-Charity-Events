// Import required modules
const path = require('path');
const express = require('express');
const cors = require('cors');

// Import the MySQL database connection
const db = require('./event_db');

// Create the Express application
const app = express();

// Allow requests from the client-side website
app.use(cors());

// Allow Express to read JSON request bodies
app.use(express.json());

// Serve the client-side HTML, CSS and JavaScript files
app.use(express.static(path.join(__dirname, '../client-side')));


// --------------------------------------------------
// GET /api/events
// Returns all current and upcoming charity events
// together with their category name.
// This endpoint is used by the Home page.
// --------------------------------------------------
app.get('/api/events', (req, res) => {
    const sql = `
        SELECT events.*, categories.category_name
        FROM events
        JOIN categories
        ON events.category_id = categories.category_id
       WHERE events.event_date >= CURDATE()
       AND events.status != 'suspended'
       ORDER BY events.event_date ASC
    `;

    // Send the SQL query to the MySQL database
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving events:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Return the event records as JSON
        res.json(results);
    });
});


// --------------------------------------------------
// GET /api/categories
// Returns all available event categories.
// This endpoint is used to populate the category
// dropdown on the Search Events page.
// --------------------------------------------------
app.get('/api/categories', (req, res) => {
    const sql = `
        SELECT *
        FROM categories
        ORDER BY category_name ASC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error retrieving categories:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(results);
    });
});


// --------------------------------------------------
// GET /api/events/search
// Searches events using optional criteria:
// date, location and category.
// Users can search using one or multiple filters.
// --------------------------------------------------
app.get('/api/events/search', (req, res) => {
    // Get the search values from the URL query string
    const { date, location, category } = req.query;

    // Start with a base query that joins events and categories
    let sql = `
        SELECT events.*, categories.category_name
        FROM events
        JOIN categories
        ON events.category_id = categories.category_id
        WHERE events.status != 'suspended'
    `;

    // Store values separately so parameterised queries can be used
    const values = [];

    // Add a date condition only if the user selected a date
    if (date) {
        sql += ' AND events.event_date = ?';
        values.push(date);
    }

    // Add a location condition only if the user entered a location
    if (location) {
        sql += ' AND events.location = ?';
        values.push(location);
    }

    // Add a category condition only if the user selected a category
    if (category) {
        sql += ' AND events.category_id = ?';
        values.push(category);
    }

    // Show matching events in date order
    sql += ' ORDER BY events.event_date ASC';

    // Execute the search query
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error searching events:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(results);
    });
});


// --------------------------------------------------
// GET /api/events/:id
// Returns the complete details for one selected event.
// The event ID is passed in the URL.
// Example: /api/events/1
// --------------------------------------------------
app.get('/api/events/:id', (req, res) => {
    // Read the event ID from the URL parameter
    const eventId = req.params.id;

    const sql = `
        SELECT events.*, categories.category_name
        FROM events
        JOIN categories
        ON events.category_id = categories.category_id
        WHERE events.event_id = ?
    `;

    // Use a parameterised query to safely retrieve the selected event
    db.query(sql, [eventId], (err, results) => {
        if (err) {
            console.error('Error retrieving event details:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Return a 404 response if the event does not exist
        if (results.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Return only the selected event
        res.json(results[0]);
    });
});


// Port used by the Node.js server
const PORT = 3000;

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});