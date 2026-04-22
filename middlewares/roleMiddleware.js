function verificarRol(rolRequerido) {
  return function (req, res, next) {
    const usuario = req.usuario;

    if (!usuario) {
      return res.status(401).send({
        error: "Usuario no autenticado"
      });
    }

    if (usuario.role !== rolRequerido) {
      return res.status(403).send({
        error: "Acceso denegado: permisos insuficientes"
      });
    }

    next();
  };
}

module.exports = verificarRol;