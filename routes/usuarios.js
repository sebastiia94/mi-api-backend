const validarUsuario = require("../middlewares/validarUsuario");
const express = require("express");
const router = express.Router();
const verificarToken = require("../middlewares/authMiddleware");
const verificarRol = require("../middlewares/roleMiddleware");
const controlador = require("../controllers/usuariosController");

router.get("/", verificarToken, controlador.obtenerUsuarios);
router.get("/:nombre", controlador.obtenerUsuarioPorNombre);

router.post("/", validarUsuario, controlador.crearUsuario);
router.post("/login", controlador.loginUsuario);

router.put("/:id", controlador.actualizarUsuario);

router.delete(
  "/:id",
  verificarToken,
  verificarRol("admin"),
  controlador.eliminarUsuario
);


module.exports = router;