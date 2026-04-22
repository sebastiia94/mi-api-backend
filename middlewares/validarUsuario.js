function validarUsuario(req, res, next) {
  let { name, email, password, balance } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({
      error: "Faltan datos obligatorios"
    });
  }

  if (typeof name !== "string") {
    return res.status(400).send({
      error: "El nombre debe ser texto"
    });
  }

  if (!email.includes("@")) {
    return res.status(400).send({
      error: "Email inválido"
    });
  }

  if (password.length < 6) {
    return res.status(400).send({
      error: "La contraseña debe tener mínimo 6 caracteres"
    });
  }

  if (typeof balance !== "number" || balance < 0) {
    return res.status(400).send({
      error: "El balance debe ser un número positivo"
    });
  }

  next();
}

module.exports = validarUsuario;