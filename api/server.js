const express = require('express');
const cors = require('cors');
const db = require('./event_db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Charity Events API is running');
});

app.get('/api/events', (req, res) => {
    const sql = `
        SELECT events.*, categories.category_name
        FROM events
        JOIN categories
        ON events.category_id = categories.category_id
        WHERE events.event_date >= CURDATE()
        ORDER BY events.event_date ASC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(results);
    });
});

app.get('/api/categories', (req, res) => {
    const sql = 'SELECT * FROM categories ORDER BY category_name ASC';

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(results);
    });
});

app.get('/api/events/search', (req, res) => {
    const { date, location, category } = req.query;

    let sql = `
        SELECT events.*, categories.category_name
        FROM events
        JOIN categories
        ON events.category_id = categories.category_id
        WHERE 1 = 1
    `;

    const values = [];

    if (date) {
        sql += ' AND events.event_date = ?';
        values.push(date);
    }

    if (location) {
        sql += ' AND events.location = ?';
        values.push(location);
    }

    if (category) {
        sql += ' AND events.category_id = ?';
        values.push(category);
    }

    sql += ' ORDER BY events.event_date ASC';

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.json(results);
    });
});

app.get('/api/events/:id', (req, res) => {
    const eventId = req.params.id;

    const sql = `
        SELECT events.*, categories.category_name
        FROM events
        JOIN categories
        ON events.category_id = categories.category_id
        WHERE events.event_id = ?
    `;

    db.query(sql, [eventId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json(results[0]);
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});