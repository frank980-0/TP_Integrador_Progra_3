const puppeteer = require("puppeteer");
const Venta = require("../models/Venta");
const Producto = require("../models/producto");

const descargarTicketPdf = async (req, res) => {
  const { html, totalVenta, itemsCarrito } = req.body;

  if (!html) {
    return res.status(400).send("Falta el contenido HTML");
  }

  try {
    // ============================================================
    // NUEVO: REGISTRAMOS LA VENTA EN LA BASE DE DATOS
    // ============================================================
    if (totalVenta && itemsCarrito) {
      // Guardamos la venta (Para el top 10 ventas más caras)
      await Venta.create({
        total: totalVenta,
        detalle_productos: JSON.stringify(itemsCarrito)
      });

      // Actualizamos el contador de cada producto (Para el top 10 más vendidos)
      for (const item of itemsCarrito) {
        // Buscamos el producto por ID (asumiendo que item.id existe en tu carrito)
        const prod = await Producto.findByPk(item.id);
        if (prod) {
          prod.cantidad_vendida += item.cantidad;
          await prod.save();
        }
      }
    }
    // ============================================================

    // ACÁ SIGUE TU CÓDIGO NORMAL DE PUPPETEER...
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const estilosPdf = `
      <style>
        body { font-family: 'Helvetica', sans-serif; padding: 30px; color: #333; }
        h2 { color: rgb(221, 139, 32); border-bottom: 2px solid #eee; padding-bottom: 10px; }
        ul { padding-left: 20px; line-height: 1.8; }
        hr { border: 0; border-top: 1px dashed #ccc; margin: 20px 0; }
        h3 { text-align: right; font-size: 1.4rem; color: #111; }
      </style>
    `;

    await page.setContent(estilosPdf + html, { waitUntil: "domcontentloaded" });

    const pdfBuffer = await page.pdf({
      format: "A6",
      printBackground: true,
      margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
    });

    await browser.close();

    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error en Puppeteer:", error);
    res.status(500).send("Error interno al generar el PDF");
  }
};
module.exports = { descargarTicketPdf };
