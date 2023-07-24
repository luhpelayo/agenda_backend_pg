const express = require('express');
const db = require('./db');

const router = express.Router();

// Ruta GET para obtener los eventos de la agenda desde la base de datos
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM agenda');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener eventos de la agenda:', error);
    res.status(500).json({ error: 'Error al obtener eventos de la agenda' });
  }
});

module.exports = router;
