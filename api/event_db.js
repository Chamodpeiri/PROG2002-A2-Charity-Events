// Load environment variables from the .env file
const mysql = require('mysql2');

// Import the MySQL module
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chamod@23',
    database: 'charityevents_db'
});

// --------------------------------------------------
// Test the database connection when the application starts
// --------------------------------------------------
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }

    console.log('Connected to charityevents_db');
});

// Export the connection so it can be used by server.js
module.exports = connection;