const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const validarAdmin = require("../middlewares/auth");

router.post("/registro", adminController.registrarAdmin);
router.post("/login", adminController.loginAdmin);
router.get("/logs", validarAdmin, adminController.obtenerLogs);
router.get("/estadisticas", validarAdmin, adminController.obtenerEstadisticas);

module.exports = router;
