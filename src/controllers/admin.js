const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");

// 1. CONTROLADOR PARA REGISTRO
const registrarAdmin = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    const nuevoAdmin = await Admin.create({
      correo: correo,
      password: passwordEncriptada,
    });

    res.status(201).json({
      mensaje: "Administrador creado con éxito",
      admin: nuevoAdmin.correo,
    });
  } catch (error) {
    console.error("Error al registrar admin:", error);
    res.status(500).json({ error: "Error al crear el administrador" });
  }
};

// 2. CONTROLADOR PARA LOGIN
const loginAdmin = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const adminEncontrado = await Admin.findOne({ where: { correo: correo } });
    if (!adminEncontrado) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos" });
    }

    const passwordValida = await bcrypt.compare(
      password,
      adminEncontrado.password,
    );
    if (!passwordValida) {
      return res
        .status(401)
        .json({ error: "Usuario o contraseña incorrectos" });
    }

    res
      .status(200)
      .json({ mensaje: "Login exitoso", correo: adminEncontrado.correo });
  } catch (error) {
    console.error("Error en login admin:", error);
    res.status(500).json({ error: "Error interno en el servidor" });
  }
};

// Exportamos ambos métodos de forma limpia
module.exports = {
  registrarAdmin,
  loginAdmin,
};
