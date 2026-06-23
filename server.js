const express = require("express");
const { sequelize, conectarDB } = require("./config/database.js");
const productoRoutes = require("./src/api/productoRoutes.js");
const adminRoutes = require("./src/controllers/admin.js");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PUERTO = 3000;

//  MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// rutas
app.use("/api/producto", productoRoutes);
app.use("/api/admin", adminRoutes);

// arranque del servidor
const iniciarServidor = async () => {
  try {
    await conectarDB();
    // Sincroniza los modelos con la BD (crea las tablas si no existen)
    await sequelize.sync({ force: false });
    console.log("Base de datos y tablas sincronizadas.");

    app.listen(PUERTO, () => {
      console.log(
        `Servidor de Express corriendo en http://localhost:${PUERTO}`,
      );
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor debido a un error:", error);
  }
};

iniciarServidor();
