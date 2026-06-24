const { Sequelize } = require("sequelize");
const path = require("path");
let sequelize;

// Verificamos qué dialecto estamos usando en el .env
if (process.env.DB_DIALECT === "sqlite") {
  // Configuración para SQLite
  sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT || "sqlite",
    storage: process.env.DB_STORAGE || "./data/petshop.db", // Lee la ruta del .env
    logging: false,
  });
}
// Solo verificamos la conexión
const conectarDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a SQLite establecida correctamente.");
  } catch (error) {
    console.error("Error al conectar con SQLite:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, conectarDB };
