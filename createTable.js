/*const db = require('./db');

// Crear tabla de usuarios
async function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(100) NOT NULL,
      role VARCHAR(20) NOT NULL
    )
  `;

  try {
    await db.query(createTableQuery);
    console.log('Tabla de usuarios creada con éxito.');
  } catch (error) {
    console.error('Error al crear tabla de usuarios:', error);
  }
}

// Crear la tabla de usuarios
createUsersTable();

*/
