require("dotenv").config();
const express = require("express");
require("./src/config/db");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const app = express();

const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(cors());

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
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
