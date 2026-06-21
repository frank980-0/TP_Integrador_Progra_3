const express = require("express");
const { sequelize, conectarDB } = require("./config/database.js");
const productoRoutes = require("./src/api/productoRoutes.js");
const adminRoutes = require("./src/controllers/admin.js");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Para que sirva tu HTML/CSS/JS del frente

// Conectamos las rutas con un prefijo semántico (/api/producto)
app.use("/api/producto", productoRoutes);
app.use("/api/admin", adminRoutes);

// Inicialización del Servidor y BD
const iniciarServer = async () => {
  try {
    await conectarDB();
    await sequelize.sync({ alter: true });
    console.log("Base de datos y tablas sincronizadas con éxito.");

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor debido a un error:", error);
  }
};

iniciarServer();
