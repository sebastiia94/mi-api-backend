require("dotenv").config();
const express = require("express");
require("./src/config/db");

const app = express();

const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());

const rutasUsuarios = require("./routes/usuarios");
app.use("/api/v1/usuarios", rutasUsuarios);

// rutas adicionales
app.get("/", function(req, res) {
  res.send("Mi primera API funcionando");
});


// 👇 SIEMPRE antes del listen
app.use(errorHandler);

// 👇 SIEMPRE AL FINAL
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log("Servidor corriendo en el puerto " + PORT);
});
