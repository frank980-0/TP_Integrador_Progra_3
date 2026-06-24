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
    // Si el token es erroneo o expiro 1 hora
    return res
      .status(401)
      .json({ error: "Sesión inválida o expirada. Volvé a ingresar." });
  }
};

module.exports = verificarAdmin;
