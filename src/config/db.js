const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Conectado a MySQL");
    connection.release();
  } catch (error) {
    console.error("Error de conexión:", error.message);
  }
}
async function crearTabla() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        balance DECIMAL(10,2),
        role VARCHAR(20) DEFAULT 'user'
      )
    `);

    console.log("Tabla users verificada/creada");
  } catch (error) {
    console.error("Error creando tabla:", error.message);
  }
}

testConnection();
crearTabla();

module.exports = pool;