const { DataTypes } = require('sequelize');
// Importamos la conexión que creamos hace un ratito
const sequelize = require('../config/database'); 

const Producto = sequelize.define('Producto', {
  // Nota: Sequelize crea la columna 'id' automáticamente, no hace falta escribirla.
  
  nombre: {
    type: DataTypes.STRING,
    allowNull: false // Obliga a que el producto siempre tenga nombre
  },
  precio: {
    type: DataTypes.FLOAT, // Usamos FLOAT por si querés ponerle centavos
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING, // Acá guardaremos el nombre o la ruta del archivo
    allowNull: true 
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true // El panel debe poder permitir agregar un nuevo producto activo por defecto
  }
}, {
  // Opciones extra de la tabla
  tableName: 'productos',
  timestamps: true // Esto agrega automáticamente columnas de 'createdAt' y 'updatedAt'
});

module.exports = Producto;