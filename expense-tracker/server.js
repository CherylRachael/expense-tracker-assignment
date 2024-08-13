const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api'); // Path to your routes file

// Create Express app
const app = express();

// Configure CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use API routes
app.use(apiRoutes);

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Replace with your MySQL username
  password: '123456789',  // Replace with your MySQL password
  database: 'expense_tracker'  // Replace with your MySQL database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
  console.log('Connected to the database.');
});

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = db; // Export the database connection for use in routes
