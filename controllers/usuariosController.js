const {
  obtenerUsuariosDB,
  crearUsuarioDB,
  actualizarUsuarioDB,
  eliminarUsuarioDB,
  loginUsuarioDB
} = require("../services/usuariosService");

const jwt = require("jsonwebtoken");

function validarUsuario(usuario) {
  if (!usuario.nombre || !usuario.edad) {
    return "Faltan datos";
  }

  if (typeof usuario.edad !== "number") {
    return "La edad debe ser un número";
  }

  return null;
}
async function obtenerUsuarios(req, res, next) {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    const email = req.query.email || "";

const usuarios = await obtenerUsuariosDB(page, limit, email);

    if (!usuarios || usuarios.length === 0) {
      const error = new Error("No hay usuarios registrados");
      error.status = 404;
      throw error;
    }

    res.status(200).send({
      mensaje: "Lista de usuarios",
      page: parseInt(page),
      limit: parseInt(limit),
      data: usuarios
    });

  } catch (error) {
    next(error);
  }
}
async function crearUsuario(req, res, next) {
  try {
    let nuevoUsuario = req.body;

    if (!nuevoUsuario.name || !nuevoUsuario.email || !nuevoUsuario.password) {
      const error = new Error("Faltan datos obligatorios");
      error.status = 400;
      throw error;
    }

    await crearUsuarioDB(nuevoUsuario);

    res.status(201).send({
      mensaje: "Usuario creado en MySQL"
    });

  } catch (error) {
    next(error);
  }
}

async function actualizarUsuario(req, res, next) {
  try {
    let id = req.params.id;
    let datos = req.body;

    if (!id) {
      const error = new Error("ID requerido");
      error.status = 400;
      throw error;
    }

    const resultado = await actualizarUsuarioDB(id, datos);

    if (resultado.affectedRows === 0) {
      const error = new Error("Usuario no encontrado");
      error.status = 404;
      throw error;
    }

    res.status(200).send({
      mensaje: "Usuario actualizado correctamente"
    });

  } catch (error) {
    next(error);
  }
}
async function eliminarUsuario(req, res, next) {
  try {
    let id = req.params.id;

    if (!id) {
      const error = new Error("ID requerido");
      error.status = 400;
      throw error;
    }

    const resultado = await eliminarUsuarioDB(id);

    if (resultado.affectedRows === 0) {
      const error = new Error("Usuario no encontrado");
      error.status = 404;
      throw error;
    }

    res.status(200).send({
      mensaje: "Usuario eliminado correctamente"
    });

  } catch (error) {
    next(error);
  }
}

function obtenerUsuarioPorNombre(req, res) {
  let usuarios = leerUsuarios();

  let nombre = req.params.nombre;

  let usuario = usuarios.find(u => u.nombre === nombre);

  if (!usuario) {
    return res.status(404).send({
      error: "Usuario no encontrado"
    });
  }

  res.status(200).send({
    mensaje: "Usuario encontrado",
    data: usuario
  });
}
async function loginUsuario(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        error: "Email y contraseña son obligatorios"
      });
    }

    const usuario = await loginUsuarioDB(email, password);

    if (!usuario) {
      return res.status(401).send({
        error: "Credenciales inválidas"
      });
    }

    const token = jwt.sign(
  { id: usuario.id, email: usuario.email, role: usuario.role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

res.status(200).send({
  mensaje: "Login exitoso",
  token: token
});

  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: "Error en el login"
    });
  }
}
module.exports = {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioPorNombre,
  loginUsuario
};
