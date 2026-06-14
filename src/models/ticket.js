const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Ticket = sequelize.define('Ticket', {
  nombreCliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precioTotal: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW // Guarda automáticamente la fecha y hora exactas de la compra
  }
}, {
  tableName: 'ventas', // Le ponemos "ventas" porque es el término que usa el TP
  timestamps: true
});

module.exports = Ticket;