const express = require('express');
const bodyParser = require('body-parser');
const usuariosRoutes = require('./api/usuariosRoutes'); // Importar el módulo usersRoutes.js
const rolesRoutes = require('./api/rolesRoutes');
const estadosReservasRoutes = require('./api/estadosReservasRoutes');
const qrRoutes = require('./api/qrRoutes');
const agendaRoutes = require('./api/agendaRoutes');
const turnosRoutes = require('./api/turnosRoutes');
const tiposEventosRoutes = require('./api/tiposEventosRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

// Usar el módulo usersRoutes como middleware para las rutas relacionadas con usuarios
app.use('/api/usuarios', usuariosRoutes);

app.use('/api/roles', rolesRoutes);
app.use('/api/estadosreservas', estadosReservasRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/turnos', turnosRoutes);
app.use('/api/tiposEventos', tiposEventosRoutes);


app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
