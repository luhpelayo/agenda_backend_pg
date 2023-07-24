const crypto = require('crypto');

// Generar una clave secreta aleatoria de 32 bytes (256 bits)
const secretKey = crypto.randomBytes(32).toString('hex');

module.exports = secretKey;
