const express = require('express');
const db = require('./db');

const router = express.Router();

// Ruta GET para obtener los tipos de eventos desde la base de datos
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM tiposEventos');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener tipos de eventos:', error);
    res.status(500).json({ error: 'Error al obtener tipos de eventos' });
  }
});

module.exports = router;
