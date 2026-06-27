import { estado } from "./estado.js";
import { API_BASE_URL } from "./config.js";

export async function generarTicket() {
  const fecha = new Date().toLocaleString("es-AR");
  const total = estado.carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0,
  );

  // 🛠️ MODIFICACIÓN ACÁ: Agregamos precio unitario y subtotal por producto
  let htmlItems = estado.carrito
    .map((item) => {
      const unitario = item.precio.toLocaleString("es-AR");
      const subtotalProducto = (item.precio * item.cantidad).toLocaleString(
        "es-AR",
      );

      return `<li>
          ${item.cantidad} x ${item.nombre} (${item.variante || "Única"}) 
          [unit.$${unitario}] - Total: $${subtotalProducto}
        </li>`;
    })
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

  const contenedor = document.getElementById("ticket-contenido");
  if (contenedor) contenedor.innerHTML = contenidoHtml;

  try {
    const respuesta = await fetch(`${API_BASE_URL}/generar-pdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        html: contenidoHtml,
        totalVenta: total,
        itemsCarrito: estado.carrito,
      }),
    });

    if (!respuesta.ok)
      throw new Error("Error al generar el PDF en el servidor");

    const blob = await respuesta.blob();
    const urlPdf = window.URL.createObjectURL(blob);

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
