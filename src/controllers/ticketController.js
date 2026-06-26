const puppeteer = require("puppeteer");

const descargarTicketPdf = async (req, res) => {
  const { html } = req.body;

  if (!html) {
    return res.status(400).send("Falta el contenido HTML");
  }

  try {
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
