require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

// Realizar la prueba de conexión al cargar el módulo
(async () => {
  try {
    await pool.query('SELECT 1'); // Realizar una consulta de prueba
    console.log('Conexión exitosa a PostgreSQL');
    // Aquí puedes realizar operaciones con la base de datos
  } catch (error) {
    console.error('Error al conectarse a PostgreSQL:', error);
  }
})();
