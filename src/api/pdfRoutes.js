const express = require("express");
const router = express.Router();
const { descargarTicketPdf } = require("../controllers/ticketController");

router.post("/generar-pdf", descargarTicketPdf);

module.exports = router;
