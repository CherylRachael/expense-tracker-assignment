const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust path as necessary to your database connection file

// Route to fetch expenses data
router.get('/api/expenses', (req, res) => {
  const query = 'SELECT * FROM expenses';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

module.exports = router;
