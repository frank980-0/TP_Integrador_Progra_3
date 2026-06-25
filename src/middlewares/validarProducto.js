const validarProducto = (req, res, next) => {
  const { nombre, precio, tipo } = req.body;

  // Si falta alguno de los datos obligatorios lo frenamos antes de que vaya a la BD
  if (!nombre || !precio || !tipo) {
    return res.status(400).json({
      error: "Todos los campos (nombre, precio, tipo) son obligatorios.",
    });
  }

  const precioNumerico = Number(precio);

  if (isNaN(precioNumerico) || precioNumerico <= 0) {
    return res
      .status(400)
      .json({ error: "El precio debe ser un número mayor a cero." });
  }
  req.body.precio = precioNumerico;
  next();
};
module.exports = validarProducto;
