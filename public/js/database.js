// En tu servidor Node.js / Express
const express = require('express');
const app = express();
// Asumiendo que ya armaste tu modelo Sequelize llamado "Producto"
const Producto = require('./models/Producto'); 

app.get('/src/api/producto', async (req, res) => {
  try {
    const listaDeProductos = await Producto.findAll();
    res.json(listaDeProductos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar los productos' });
  }
});



const rutasAdmin = require('./src/controllers/admin');
app.use('/api/controllers/admin', rutasAdmin);