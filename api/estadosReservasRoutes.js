const express = require('express');
const db = require('./db');

const router = express.Router();

// Ruta GET para obtener los estados de reservas desde la base de datos
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM estadosreservas');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener estados de reservas:', error);
    res.status(500).json({ error: 'Error al obtener estados de reservas' });
  }
});

module.exports = router;
