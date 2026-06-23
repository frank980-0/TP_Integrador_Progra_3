const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/database");

const Admin = sequelize.define(
  "Admin",
  {
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Para que no haya dos administradores con el mismo mail
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "administradores",
    timestamps: true,
  },
);

module.exports = Admin;
