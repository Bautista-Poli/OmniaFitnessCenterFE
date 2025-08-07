// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());



const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // necesario en algunos entornos
  }
});

// Ruta para incrementar el valor
app.post('/increment', async (req, res) => {
  try {
    const id = 1; // ID fijo o recibido desde el frontend
    await pool.query(`
      UPDATE playing_with_neon SET value = value + 1 WHERE id = $1
    `, [id]);

    const result = await pool.query(`
      SELECT value FROM playing_with_neon WHERE id = $1
    `, [id]);

    res.json({ value: result.rows[0].value });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error incrementando el valor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
