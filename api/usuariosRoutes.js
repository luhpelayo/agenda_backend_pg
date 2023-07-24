const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db');
const authMiddleware = require('../middleware/authMiddleware');
const secretKey = require('../config');
const router = express.Router();

// Ruta POST para el inicio de sesión
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  // Verificar las credenciales del usuario en la base de datos
  try {
    const { rows } = await db.query('SELECT * FROM usuarios WHERE correo = $1 AND contraseña = $2', [
      correo,
      contraseña,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Usuario autenticado, generar el token JWT
    //const secretKey = 'mi_clave_secreta'; // Reemplaza 'mi_clave_secreta' con tu propia clave secreta
    const usuario = { id: rows[0].id_usuario, nombre: rows[0].nombre }; // Datos del usuario que quieres incluir en el token

    const token = jwt.sign({ user: usuario }, secretKey, { expiresIn: '1h' });

    // Enviar el token JWT en la respuesta al cliente
    res.json({ token });
  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    res.status(500).json({ error: 'Error al autenticar usuario' });
  }
});

// Ruta protegida que requiere autenticación
router.get('/datos_protegidos', authMiddleware, (req, res) => {
  // El middleware de autenticación ya ha verificado el token y agregado los datos del usuario a req.user
  const usuario = req.user;
  res.json({ mensaje: 'Estos datos están protegidos.', usuario });
});

module.exports = router;

/*const express = require('express');
const db = require('./db');
const authMiddleware = require('../middleware/authMiddleware'); // Asegúrate de ajustar la ruta correcta a authMiddleware.js

const router = express.Router();

// Ruta GET protegida para obtener los usuarios desde la base de datos
router.get('/', authMiddleware, async (req, res) => {
  // Aquí puedes usar req.user para obtener información del usuario autenticado si es necesario
  try {
    const { rows } = await db.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

module.exports = router;

*/

/*const express = require('express');
const db = require('./db');

const router = express.Router();

// Ruta GET para obtener los usuarios desde la base de datos
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

module.exports = router; */
