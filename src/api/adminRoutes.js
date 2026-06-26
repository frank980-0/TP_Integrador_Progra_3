const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.post("/registro", adminController.registrarAdmin);

router.post("/login", adminController.loginAdmin);


module.exports = router;
