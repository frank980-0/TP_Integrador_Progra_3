const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// Importamos el modelo de Admin respetando tu estructura de carpetas
const Admin = require("../models/admin");

// --------------------------------------------------------
// 1. ENDPOINT PARA CREAR UN ADMIN
// --------------------------------------------------------
// recibe la petición del formulario de registro del administrador, encripta la contraseña y la guarda en la base de datos
router.post("/registro", async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Validamos que lleguen los datos
    if (!correo || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Encriptamos la contraseña antes de guardarla (El "10" es el nivel de seguridad)
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    // Guardamos en la base de datos
    const nuevoAdmin = await Admin.create({
      correo: correo,
      password: passwordEncriptada,
    });

    res.status(201).json({
      mensaje: "Administrador creado con éxito",
      admin: nuevoAdmin.correo,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el administrador" });
  }
});

// --------------------------------------------------------
// 2. ENDPOINT PARA EL LOGIN DEL ADMIN
// --------------------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { correo, password } = req.body;

    // 1. Buscamos si existe un administrador con ese correo
    const adminEncontrado = await Admin.findOne({ where: { correo: correo } });
    if (!adminEncontrado) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos" });
    }

    // 2. Comparamos la contraseña que escribió el usuario con la encriptada en la DB
    const passwordValida = await bcrypt.compare(
      password,
      adminEncontrado.password,
    );
    if (!passwordValida) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos" });
    }

    // Si todo sale bien, enviamos el mensaje de éxito
    res
      .status(200)
      .json({ mensaje: "Login exitoso", correo: adminEncontrado.correo });
  } catch (error) {
    res.status(500).json({ error: "Error interno en el servidor" });
  }
});

module.exports = router;
