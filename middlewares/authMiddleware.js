const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send({
      error: "Token requerido"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secreto_super_seguro");
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).send({
      error: "Token inválido"
    });
  }
}

module.exports = verificarToken;