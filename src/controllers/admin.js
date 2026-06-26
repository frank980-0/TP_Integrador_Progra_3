const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const LogAcceso = require("../models/LogAcceso");
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

    // Token JWT
    const token = jwt.sign(
      { id: adminEncontrado.id, correo: adminEncontrado.correo },
      "CLAVE_SECRETA_PETSHOP",
      { expiresIn: "1h" },
    );

    // Guardamos el token en una cookie segura del navegador
    res.cookie("token_admin", token, {
      httpOnly: true,
      secure: false, // en produccion es true
      sameSite: "Lax",
      maxAge: 2 * 60 * 60 * 1000,
    });
    
    // Guardamos el acceso en la tabla de logs
    const ipUsuario = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Localhost (127.0.0.1)';

    await LogAcceso.create({
      admin: adminEncontrado.correo,
      ip: ipUsuario
    });
    /*
    await LogAcceso.create({
      admin: adminEncontrado.correo,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    });*/

    res
      .status(200)
      .json({ mensaje: "Login exitoso", correo: adminEncontrado.correo });
  } catch (error) {
    console.error("Error en login admin:", error);
    res.status(500).json({ error: "Error interno en el servidor" });
  }
};

// ==========================================
// CONTROLADOR PARA OBTENER LOS LOGS
// ==========================================
const obtenerLogs = async (req, res) => {
  try {
    const logs = await LogAcceso.findAll({
      // Ordenamos para que el último login aparezca arriba de todo
      order: [['fecha_hora', 'DESC']] 
    });
    
    res.json(logs);
  } catch (error) {
    console.error("Error al obtener los logs:", error);
    res.status(500).json({ error: "Error al obtener los registros de acceso." });
  }
};


module.exports = {
  registrarAdmin,
  loginAdmin,
  obtenerLogs,
};
