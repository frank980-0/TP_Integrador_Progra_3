const express = require('express');
const router = express.Router();
const Producto = require('../../models/producto'); // Traemos tu modelo

// 1. ENDPOINT PARA LISTAR (Para el catálogo del cliente y el dashboard)
router.get('/productos', async (req, res) => {
  try {
    // Buscamos solo los productos donde activo sea true (como pide el TP para el cliente)
    const productos = await Producto.findAll({ where: { activo: true } }); 
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// 2. ENDPOINT PARA CREAR (Para el formulario de alta del Administrador)
router.post('/productos', async (req, res) => {
  try {
    // Tomamos los datos que viajan desde el formulario del Frontend
    const { nombre, precio, tipo } = req.body;
    
    // Lo guardamos en SQLite usando Sequelize
    const nuevoProducto = await Producto.create({
      nombre,
      precio: parseFloat(precio),
      tipo,
      activo: true // Activo por defecto como pide la consigna
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el producto' });
  }
});

// 3. ENDPOINT PARA BAJA LÓGICA (Para el botón borrar del Administrador)
router.put('/productos/desactivar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Buscamos el producto por su ID
    const producto = await Producto.findByPk(id);
    
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

    // Hacemos la baja lógica cambiando el booleano a false
    producto.activo = false;
    await producto.save();

    res.json({ mensaje: 'Producto desactivado con éxito (Baja lógica)' });
  } catch (error) {
    res.status(500).json({ error: 'Error al desactivar el producto' });
  }
});

module.exports = router;