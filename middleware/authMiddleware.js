const jwt = require('jsonwebtoken');
const secretKey = require('../config');

function authMiddleware(req, res, next) {
  const token = req.header('Authorization');
  
  console.log('Token recibido:', token); // Agrega esta línea para verificar el valor del token
  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, secretKey);

    // Agregar el usuario decodificado al objeto de solicitud para que las rutas posteriores puedan acceder a él
    req.user = decodedToken.user;

    // Continuar con la ejecución de las rutas
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token inválido.' });
  }
}

module.exports = authMiddleware;


/*const jwt = require('jsonwebtoken');

// Middleware de autenticación con JWT
function authMiddleware(req, res, next) {
  const token = req.header('Authorization');

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, 'mi_clave_secreta'); // Reemplaza 'mi_clave_secreta' por tu propia clave secreta

    // Agregar el usuario decodificado al objeto de solicitud para que las rutas posteriores puedan acceder a él
    req.user = decodedToken.user;

    // Continuar con la ejecución de las rutas
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token inválido.' });
  }
}

module.exports = authMiddleware;  */
