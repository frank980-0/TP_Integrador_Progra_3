const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Producto = sequelize.define(
  "Producto",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    cantidad_vendida: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    tableName: "productos",
    timestamps: true,
  },
);

module.exports = Producto;
