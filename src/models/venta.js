const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Venta = sequelize.define("Venta", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // Vamos a guardar el detalle del carrito como un JSON (texto)
  // para no complicarnos con tablas intermedias.
  detalle_productos: {
    type: DataTypes.TEXT, 
    allowNull: false
  }
}, {
  tableName: "ventas",
  timestamps: false
});

module.exports = Venta;