const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'expense_tracker'
});

app.use(express.json());

// User login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
  const user = rows[0];

  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', {
    expiresIn: '1h'
  });

  res.json({ token });
});

// Retrieve all expenses for a user
app.get('/api/expenses', authenticateJWT, async (req, res) => {
  const [rows] = await pool.execute('SELECT * FROM expenses WHERE user_id = ?', [req.user.id]);
  res.json(rows);
});

// Add a new expense
app.post('/api/expenses', authenticateJWT, async (req, res) => {
  const { amount, category, date, description } = req.body;
  const [result] = await pool.execute(
    'INSERT INTO expenses (user_id, amount, category, date, description) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, amount, category, date, description]
  );
  const newExpense = { id: result.insertId, user_id: req.user.id, amount, category, date, description };
  res.status(201).json(newExpense);
});

// Update an existing expense
app.put('/api/expenses/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { amount, category, date, description } = req.body;

  const [result] = await pool.execute(
    'UPDATE expenses SET amount = ?, category = ?, date = ?, description = ? WHERE id = ? AND user_id = ?',
    [amount, category, date, description, id, req.user.id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Expense not found or not authorized' });
  }

  res.json({ id, amount, category, date, description });
});

// Delete an existing expense
app.delete('/api/expenses/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  
  const [result] = await pool.execute('DELETE FROM expenses WHERE id = ? AND user_id = ?', [id, req.user.id]);

  if (result.affectedRows === 0) {
    return res.status(404).json({ message: 'Expense not found or not authorized' });
  }

  res.status(204).end();
});

// Calculate the total expenses for a user
app.get('/api/expense', authenticateJWT, async (req, res) => {
  const [rows] = await pool.execute('SELECT SUM(amount) AS totalExpense FROM expenses WHERE user_id = ?', [req.user.id]);
  const totalExpense = rows[0].totalExpense || 0;
  res.json({ totalExpense });
});

// Middleware to authenticate JWT
function authenticateJWT(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Basic error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
