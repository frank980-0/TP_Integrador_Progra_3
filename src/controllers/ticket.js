const express = require('express');
const router = express.Router();
const Ticket = require('../database/models/ticket');
const Producto = require('../database/models/producto');

// --------------------------------------------------------
// 1. ENDPOINT PARA GUARDAR UNA COMPRA NUEVA
// Recibe: nombreCliente, precioTotal y un array con los IDs de los productos
// --------------------------------------------------------
router.post('/nueva', async (req, res) => {
  try {
    const { nombreCliente, precioTotal, productos } = req.body;

    // Mini validación de seguridad
    if (!nombreCliente || !precioTotal || !productos || productos.length === 0) {
      return res.status(400).json({ error: 'Faltan datos para procesar la venta' });
    }

    // 1. Creamos el registro del ticket en la tabla "ventas"
    const nuevoTicket = await Ticket.create({
      nombreCliente: nombreCliente,
      precioTotal: parseFloat(precioTotal)
    });

    // 2. Asociamos los productos al ticket. 
    // Sequelize nos regala el método 'addProductos' gracias a la relación que armamos en server.js
    await nuevoTicket.addProductos(productos);

    res.status(201).json({ 
      mensaje: '¡Compra registrada con éxito!', 
      ticketId: nuevoTicket.id 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno al registrar la venta' });
  }
});

// --------------------------------------------------------
// 2. ENDPOINT PARA LISTAR VENTAS (Dashboard del Administrador)
// --------------------------------------------------------
router.get('/historial', async (req, res) => {
  try {
    // Buscamos todos los tickets e INCLUIMOS los datos de los productos asociados
    const listadoVentas = await Ticket.findAll({
      include: [{
        model: Producto,
        // through: { attributes: [] } oculta la tabla intermedia para que el JSON quede más limpio
        through: { attributes: [] } 
      }],
      order: [['fecha', 'DESC']] // Ordenamos para que las compras más nuevas salgan primero
    });
    
    res.json(listadoVentas);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el historial de ventas' });
  }
});

module.exports = router;