const { Sequelize } = require("sequelize");
const path = require("path");

// Forzamos explícitamente a Sequelize a usar 'sqlite3' clásico
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../petshop.db"),
  dialectModule: require("sqlite3"), //
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

// const { Sequelize } = require("sequelize");

// // Configuración de la conexión

// const sequelize = new Sequelize("base_de_datos", "usuario", "contraseña", {
//   host: "localhost",
//   dialect: "sqlite",
//   logging: false,
// });

// // Prueba de conexión y sincronización de modelos
// const conectarDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Conexión a la base de datos establecida correctamente.");

//     await sequelize.sync({ alter: true });
//     console.log(" Modelos sincronizados con la base de datos.");
//   } catch (error) {
//     console.error(" Unable to connect to the database:", error);
//   }
// };

// // Ejecutar la conexión
// conectarDB();

// module.exports = sequelize;
