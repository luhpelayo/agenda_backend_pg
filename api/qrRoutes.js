const express = require('express');
const db = require('./db');

const router = express.Router();

// Ruta GET para obtener los QR desde la base de datos
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM qr');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener QR:', error);
    res.status(500).json({ error: 'Error al obtener QR' });
  }
});

module.exports = router;
