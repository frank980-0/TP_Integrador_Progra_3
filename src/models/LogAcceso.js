const { DataTypes } = require("sequelize");
// Subimos dos niveles (salimos de models, salimos de src) para llegar a la carpeta config
const { sequelize } = require("../../config/database"); 

const LogAcceso = sequelize.define("LogAcceso", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  admin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_hora: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Sequelize pone la fecha y hora actual automáticamente
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  // Estas dos opciones son buenas prácticas para que la tabla quede prolija en SQLite
  tableName: "log_accesos", 
  timestamps: false // Apagamos esto para que no nos obligue a tener createdAt y updatedAt
});

module.exports = LogAcceso;