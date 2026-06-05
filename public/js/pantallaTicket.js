<<<<<<< HEAD
function generarTicket() {
  const fecha = new Date().toLocaleString();
  const total = estado.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  
  let htmlItems = estado.carrito.map(item => 
    `<li>${item.cantidad} x ${item.nombre} (${item.variante}) - $${item.precio * item.cantidad}</li>`
  ).join('');
=======
import { estado } from "./estado.js";

export function generarTicket() {
  const fecha = new Date().toLocaleString();
  const total = estado.carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0,
  );

  let htmlItems = estado.carrito
    .map(
      (item) =>
        `<li>${item.cantidad} x ${item.nombre} (${item.variante}) - $${item.precio * item.cantidad}</li>`,
    )
    .join("");
>>>>>>> branchfs

  const contenido = `
    <h2>Ticket de Compra</h2>
    <p><strong>Cliente:</strong> ${estado.nombreCliente}</p>
    <p><strong>Empresa:</strong> Pet Shop System</p>
    <p><strong>Fecha:</strong> ${fecha}</p>
    <hr>
    <ul>${htmlItems}</ul>
    <hr>
    <h3>Total Pagado: $${total}</h3>
    <p>¡Gracias por su compra!</p>
  `;
<<<<<<< HEAD
  
  document.getElementById('ticket-contenido').innerHTML = contenido;
}
=======

  document.getElementById("ticket-contenido").innerHTML = contenido;
}
>>>>>>> branchfs
