const { Sequelize } = require('sequelize');
const path = require('path');
// Inicializamos Sequelize apuntando a SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../data/database.sqlite') // Este es el nombre del archivo que se va a crear en tu proyecto
});

module.exports = sequelize;
