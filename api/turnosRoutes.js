const express = require('express');
const db = require('./db');

const router = express.Router();

// Ruta GET para obtener los turnos desde la base de datos
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM turnos');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener turnos:', error);
    res.status(500).json({ error: 'Error al obtener turnos' });
  }
});

module.exports = router;
