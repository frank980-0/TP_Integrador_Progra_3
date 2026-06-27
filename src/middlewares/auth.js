const jwt = require("jsonwebtoken");

const verificarAdmin = (req, res, next) => {
  const token = req.cookies.token_admin;

  // Si no hay cookie cancela el acceso
  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso denegado. Se requiere iniciar sesión." });
  }

  try {
    const decodificado = jwt.verify(token, "CLAVE_SECRETA_PETSHOP");

    req.admin = decodificado;
    next();
  } catch (error) {
    // ⚡ DEPURACIÓN DE ORO: Esto te va a decir por qué falló el JWT
    console.log("❌ ERROR EN VALIDACIÓN DE JWT:", error.message);

    return res
      .status(401)
      .json({ error: "Sesión inválida o expirada. Volvé a ingresar." });
  }
};

module.exports = verificarAdmin;
