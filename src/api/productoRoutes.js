const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const validateProducto = require("../middlewares/validarProducto");
const validarAdmin = require("../middlewares/auth");

// Definimos las rutas del recurso "producto"
router.get("/", productoController.obtenerProductos);
router.get("/:id", productoController.obtenerProductoPorId);
router.post(
  "/",
  validarAdmin,
  validateProducto,
  productoController.crearProducto,
);
router.put("/:id", validarAdmin, productoController.modificarProducto);
router.delete("/:id", validarAdmin, productoController.eliminarProducto);

module.exports = router;
