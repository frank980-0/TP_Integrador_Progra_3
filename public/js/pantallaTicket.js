import { estado } from "./estado.js";

export async function generarTicket() {
  const fecha = new Date().toLocaleString("es-AR");
  const total = estado.carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0,
  );

  let htmlItems = estado.carrito
    .map(
      (item) =>
        `<li>${item.cantidad} x ${item.nombre} (${item.variante || "Única"}) - $${(item.precio * item.cantidad).toLocaleString("es-AR")}</li>`,
    )
    .join("");

  const contenidoHtml = `
    <h2>Ticket de Compra</h2>
    <p><strong>Cliente:</strong> ${estado.nombreCliente || "Consumidor Final"}</p>
    <p><strong>Empresa:</strong> Patitas</p>
    <p><strong>Fecha:</strong> ${fecha}</p>
    <hr>
    <ul>${htmlItems}</ul>
    <hr>
    <h3>Total Pagado: $${total.toLocaleString("es-AR")}</h3>
    <p>¡Gracias por su compra!</p>
  `;

  // 1. Lo pintamos en la pantalla del navegador como ya hacías
  const contenedor = document.getElementById("ticket-contenido");
  if (contenedor) contenedor.innerHTML = contenidoHtml;

  // 2. ⚡ LLAMAMOS AL SERVIDOR PARA GENERAR EL PDF CON PUPPETEER
  try {
    const respuesta = await fetch("http://localhost:3000/api/generar-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        html: contenidoHtml,
        totalVenta: total, // Le pasamos la plata total
        itemsCarrito: estado.carrito // Le pasamos el array de productos
      }),
    });

    if (!respuesta.ok)
      throw new Error("Error al generar el PDF en el servidor");

    // 3. Convertimos la respuesta en un archivo descargable (Blob)
    const blob = await respuesta.blob();
    const urlPdf = window.URL.createObjectURL(blob);

    // Creamos un link virtual para forzar la descarga del ticket.pdf
    const linkDescarga = document.createElement("a");
    linkDescarga.href = urlPdf;
    linkDescarga.download = `ticket-${Date.now()}.pdf`;
    document.body.appendChild(linkDescarga);
    linkDescarga.click();
    document.body.removeChild(linkDescarga);
  } catch (error) {
    console.error("No se pudo descargar el PDF:", error);
    alert("Compra registrada, pero no se pudo generar el PDF descargable.");
  }
}
