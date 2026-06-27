const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const LogAcceso = require("../models/LogAcceso");
const Producto = require("../models/producto");
const Venta = require("../models/Venta");

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

// ==========================================
// CONTROLADOR PARA ENVIAR TODAS LAS ESTADÍSTICAS
// ==========================================
const obtenerEstadisticas = async (req, res) => {
  try {
    // 1. Top 10 productos más vendidos (Ordenados por cantidad_vendida de mayor a menor)
    const productosMasVendidos = await Producto.findAll({
      where: { activo: true },
      order: [['cantidad_vendida', 'DESC']],
      limit: 10
    });

    // 2. Top 10 ventas más caras (Ordenadas por el campo total de mayor a menor)
    const ventasMasCaras = await Venta.findAll({
      order: [['total', 'DESC']],
      limit: 10
    });

    // 3. ESTADÍSTICAS EXTRA (Calculamos dos métricas más de forma directa)
    // Métrica A: Total de dinero recaudado en la plataforma
    const totalRecaudado = await Venta.sum('total') || 0;

    // Métrica B: Cantidad total de productos registrados activos en el catálogo
    const cantidadProductos = await Producto.count({ where: { activo: true } });

    // Mandamos todo empaquetado en un solo objeto de respuesta
    res.json({
      productosMasVendidos,
      ventasMasCaras,
      extra: {
        totalRecaudado,
        cantidadProductos
      }
    });

  } catch (error) {
    console.error("Error al generar estadísticas:", error);
    res.status(500).json({ error: "Error interno al procesar las estadísticas." });
  }
};

module.exports = {
  registrarAdmin,
  loginAdmin,
  obtenerLogs,
  obtenerEstadisticas,
};
