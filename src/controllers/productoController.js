const Producto = require("../models/producto.js");

// Controlador para obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const listaDeProductos = await Producto.findAll();
    res.json(listaDeProductos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al buscar los productos" });
  }
};

// Controlador para crear un producto
const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, tipo, imagen, activo } = req.body;
    const nuevoProducto = await Producto.create({
      nombre,
      precio,
      tipo,
      imagen,
      activo,
    });

    res.status(201).json({
      mensaje: "Producto creado con éxito",
      producto: nuevoProducto,
    });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ mensaje: "Error al guardar el producto" });
  }
};

// Exportamos los métodos del controlador
module.exports = {
  obtenerProductos,
  crearProducto,
};
