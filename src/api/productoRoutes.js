const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const validateProducto = require("../middlewares/validarProducto");

// Definimos las rutas del recurso "producto"
router.get("/", productoController.obtenerProductos);
router.post("/", validateProducto, productoController.crearProducto);

module.exports = router;
