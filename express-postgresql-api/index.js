// index.js

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// PostgreSQL configuration
// Create a new Pool instance for connecting to PostgreSQL
const pool = new Pool({
  user: 'test_user',
  host: 'localhost',
  database: 'crud',
  password: 'test',
  port: 5432 
});


// Function to initialize the database (create the 'items' table)
const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description TEXT
      )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Call the initializeDatabase function when the application starts
initializeDatabase();

// Enable CORS
app.use(cors());
// Middleware
app.use(bodyParser.json());

// Routes
app.get('/api/items', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM items');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/items', async (req, res) => {
  const { name, description } = req.body;
  try {
    const { rows } = await pool.query('INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *', [name, description]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const { rows } = await pool.query('UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name, description, id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
