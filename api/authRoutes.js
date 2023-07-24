/*const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db');
const authMiddleware = require('./authMiddleware');
const secretKey = require('../config');

const router = express.Router();

// Ruta POST para el inicio de sesión
router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  // Verificar las credenciales del usuario en la base de datos (ejemplo simplificado)
  try {
    const { rows } = await db.query('SELECT * FROM usuarios WHERE correo = $1 AND contraseña = $2', [
      correo,
      contraseña,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Usuario autenticado, generar el token JWT
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
*/
