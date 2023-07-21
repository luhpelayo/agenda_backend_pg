const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./api/usersRoutes'); // Importar el módulo usersRoutes.js
const roles = require('./api/roles');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Usar el módulo usersRoutes como middleware para las rutas relacionadas con usuarios
app.use('/api/users', usersRoutes);

app.use('/api/roles', roles);

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
