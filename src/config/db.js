const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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

testConnection();

module.exports = pool;