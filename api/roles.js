const express = require('express');
const db = require('./db');

const router = express.Router();

// Ruta GET para obtener los usuarios desde la base de datos
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM roles');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ error: 'Error al obtener roles' });
  }
});

module.exports = router;