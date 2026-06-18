const { Sequelize } = require("sequelize");
const path = require("path");

// Forzamos explícitamente a Sequelize a usar 'sqlite3' clásico
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../data/petshop.db"),
  dialectModule: require("sqlite3"),
  logging: false,
});

// Solo verificamos la conexión, NO sincronizamos aquí
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
