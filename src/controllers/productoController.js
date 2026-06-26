const Producto = require("../models/producto.js");

// Controlador para obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    // Agregamos la cláusula WHERE para traer exclusivamente los registros vigentes
    const listaDeProductos = await Producto.findAll({
      where: {
        activo: true
      }
    });
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

// Función para actualizar los datos de un producto (Modificación)
const modificarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, tipo, imagen } = req.body; // Recibe los datos nuevos
    
    await Producto.update(
      { nombre, precio, tipo, imagen },
      { where: { id } }
    );
    res.json({ mensaje: "¡Producto actualizado con éxito!" });
  } catch (error) {
    console.error("Error al modificar:", error);
    res.status(500).json({ error: "No se pudo modificar el producto." });
  }
};

// 1. BAJA LÓGICA: Cambiamos el estado, no borramos el registro
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Hacemos un UPDATE del campo activo a false
    await Producto.update(
      { activo: false }, 
      { where: { id } }
    );
    
    res.json({ mensaje: "¡Producto dado de baja correctamente!" });
  } catch (error) {
    console.error("Error en baja lógica:", error);
    res.status(500).json({ error: "No se pudo realizar la baja lógica." });
  }
};

// Exportamos los métodos del controlador
module.exports = {
  obtenerProductos,
  crearProducto,
  modificarProducto,
  eliminarProducto,
};
