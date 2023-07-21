const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrar usuario
app.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Verificar si el usuario ya existe en la base de datos
    const checkUserQuery = 'SELECT * FROM users WHERE username = $1';
    const existingUser = await db.query(checkUserQuery, [username]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    // Cifrar la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    const insertUserQuery = 'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)';
    await db.query(insertUserQuery, [username, hashedPassword, role]);

    res.status(201).json({ message: 'Usuario registrado con éxito.' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario.' });
  }
});

// Iniciar sesión
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const getUserQuery = 'SELECT * FROM users WHERE username = $1';
    const user = await db.query(getUserQuery, [username]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user.rows[0].id, username: user.rows[0].username }, 'tu_clave_secreta', {
      expiresIn: '7d', // Token válido por 7 días
    });

    res.status(200).
// ...continuación del paso 4

res.status(200).json({ token });
} catch (error) {
  console.error('Error al iniciar sesión:', error);
  res.status(500).json({ message: 'Error al iniciar sesión.' });
}
});

// Middleware para verificar el token de autenticación
function verifyToken(req, res, next) {
const token = req.headers['authorization'];

if (!token) {
  return res.status(403).json({ message: 'No se proporcionó el token de autenticación.' });
}

jwt.verify(token, 'tu_clave_secreta', (err, decoded) => {
  if (err) {
    return res.status(401).json({ message: 'Token inválido o expirado.' });
  }

  // Agregar el objeto "decoded" al request para que pueda ser utilizado en otras rutas
  req.user = decoded;
  next();
});
}

// Ruta protegida que requiere un token de autenticación válido
app.get('/protected', verifyToken, (req, res) => {
res.status(200).json({ message: 'Ruta protegida, usuario autenticado.' });
});

// Ruta protegida con autorización basada en el rol
app.get('/admin', verifyToken, (req, res) => {
if (req.user.role === 'admin') {
  res.status(200).json({ message: 'Ruta de administrador, usuario autorizado.' });
} else {
  res.status(403).json({ message: 'Usuario no autorizado para acceder a esta ruta.' });
}
});
