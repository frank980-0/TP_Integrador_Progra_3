const express = require("express");
const cors = require("cors");
const { conectarDB, sequelize } = require("./config/database");
const productoRoutes = require("./src/api/productoRoutes");
const app = express();
const PUERTO = 3000;

//  MIDDLEWARES
app.use(cors());
app.use(express.json()); // Para que Express entienda los JSON que manda el fetch

// --- TUS RUTAS ---
app.use("/api/producto", productoRoutes);

// --- ARRANQUE DEL SERVIDOR ---
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
