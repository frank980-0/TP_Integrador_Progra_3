// En tu servidor Node.js / Express
const express = require('express');
const app = express();
// Asumiendo que ya armaste tu modelo Sequelize llamado "Producto"
const Producto = require('./models/Producto'); 

// Creamos la ruta (El mozo)
app.get('/api/productos', async (req, res) => {
  try {
    // 1. La cocina: Sequelize busca TODOS los productos en SQLite
    const listaDeProductos = await Producto.findAll();
    
    // 2. El mozo entrega el pedido: Enviamos los datos al frontend en formato JSON
    res.json(listaDeProductos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar los productos' });
  }
});