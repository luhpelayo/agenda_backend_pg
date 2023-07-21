const express = require('express');
const db = require('./db');

const app = express();

// Ruta GET para obtener los roles desde la base de datos
app.get('/api/roles', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM roles');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ error: 'Error al obtener roles' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
