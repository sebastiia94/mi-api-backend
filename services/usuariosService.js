const fs = require("fs");
const db = require("../src/config/db");
const bcrypt = require("bcrypt");

async function loginUsuarioDB(email, password) {
  const query = "SELECT * FROM users WHERE email = ?";
  const [rows] = await db.query(query, [email]);

  if (rows.length === 0) {
    return null;
  }

  const usuario = rows[0];

  const passwordValida = await bcrypt.compare(password, usuario.password);

  if (!passwordValida) {
    return null;
  }

  return usuario;
}
async function obtenerUsuariosDB(page = 1, limit = 5, email = "") {
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM users";
  let params = [];

  if (email) {
    query += " WHERE email LIKE ?";
    params.push(`%${email}%`);
  }

  query += " LIMIT ? OFFSET ?";
  params.push(parseInt(limit), parseInt(offset));

  const [rows] = await db.query(query, params);

  return rows;
}

function leerUsuarios() {
  let data = fs.readFileSync("./database/usuarios.json");
  return JSON.parse(data);
}

function guardarUsuarios(usuarios) {
  fs.writeFileSync("./database/usuarios.json", JSON.stringify(usuarios, null, 2));
}
async function crearUsuarioDB(usuario) {
  const { name, email, password, balance, role } = usuario;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (name, email, password, balance, role)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(query, [
    name,
    email,
    hashedPassword,
    balance,
    role || "user"
  ]);

  return result;
}
async function actualizarUsuarioDB(id, datos) {
  const { name, email, password, balance } = datos;

  const query = "UPDATE users SET name = ?, email = ?, password = ?, balance = ? WHERE id = ?";

  const [result] = await db.query(query, [name, email, password, balance, id]);

  return result;
}
async function eliminarUsuarioDB(id) {
  const query = "DELETE FROM users WHERE id = ?";
  const [result] = await db.query(query, [id]);
  return result;
}
async function eliminarUsuario(req, res) {
  try {
    let id = req.params.id;

    const resultado = await eliminarUsuarioDB(id);

    if (resultado.affectedRows === 0) {
      return res.status(404).send({
        error: "Usuario no encontrado"
      });
    }

    res.status(200).send({
      mensaje: "Usuario eliminado correctamente"
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "Error al eliminar usuario"
    });
  }

}
module.exports = {
  leerUsuarios,
  guardarUsuarios,
  obtenerUsuariosDB, 
  crearUsuarioDB,
  actualizarUsuarioDB,
  eliminarUsuarioDB,
  loginUsuarioDB
};