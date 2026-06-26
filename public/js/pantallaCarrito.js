import { estado } from "./estado.js";
import { mostrarPantalla } from "./controladorPantallas.js";
import { generarTicket } from "./pantallaTicket.js";

// --- 1. LÓGICA INTERNA DEL CARRITO ---

function agregarAlCarrito(id, nombre, variante, precio) {
  const itemExistente = estado.carrito.find(
    (item) => item.id === id && item.variante === variante,
  );

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    estado.carrito.push({ id, nombre, variante, precio, cantidad: 1 });
  }

  actualizarContador();
}

function eliminarProductoDelCarrito(index) {
  estado.carrito.splice(index, 1);
  renderizarCarrito();
  actualizarContador();
}

function cambiarCantidad(index, delta) {
  const item = estado.carrito[index];
  item.cantidad += delta;

  if (item.cantidad <= 0) {
    eliminarProductoDelCarrito(index);
  } else {
    renderizarCarrito();
  }
}

function actualizarContador() {
  const totalItems = estado.carrito.reduce(
    (sum, item) => sum + item.cantidad,
    0,
  );
  const contador = document.getElementById("contador-carrito");
  if (contador) {
    contador.innerText = totalItems;
  }
}

// --- VISTAS DEL CARRITO Y TICKET ---

export function irAlCarrito() {
  renderizarCarrito();
  mostrarPantalla("carrito");
}

function renderizarCarrito() {
  const contenedor = document.getElementById("lista-carrito-detalle");
  if (!contenedor) return;

  contenedor.innerHTML = "";
  let total = 0;

  if (estado.carrito.length === 0) {
    contenedor.innerHTML = `<p class="texto-vacio">Tu carrito está vacío.</p>`;
    const elementoTotal = document.getElementById("total-carrito");
    if (elementoTotal) elementoTotal.innerText = "0";
    return;
  }

  estado.carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    contenedor.innerHTML += `
      <div class="item-carrito">
        <p>${item.nombre} (${item.variante || "Única"})</p>
        <div>
          <button onclick="window.cambiarCantidad(${index}, -1)">-</button>
          <span>${item.cantidad}</span>
          <button onclick="window.cambiarCantidad(${index}, 1)">+</button>
        </div>
        <p>$${subtotal}</p>
        <button onclick="window.eliminarProductoDelCarrito(${index})">Eliminar</button>
      </div>
    `;
  });

  const elementoTotal = document.getElementById("total-carrito");
  if (elementoTotal) elementoTotal.innerText = total;
}

function reiniciarCarrito() {
  estado.carrito = [];

  actualizarContador();
  renderizarCarrito();
}

function finalizarCompra() {
  if (estado.carrito.length === 0) return alert("El carrito está vacío");

  if (typeof generarTicket === "function") {
    generarTicket();
  }
  reiniciarCarrito();
}

window.agregarAlCarrito = agregarAlCarrito;
window.eliminarProductoDelCarrito = eliminarProductoDelCarrito;
window.cambiarCantidad = cambiarCantidad;
window.irAlCarrito = irAlCarrito;

document.addEventListener("DOMContentLoaded", () => {
  // Vincular el botón "Finalizar Compra" adentro de la pantalla del carrito
  const btnFinalizar = document.getElementById("btn-finalizar-compra");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", finalizarCompra);
  }

  //  Vincular el botón "Seguir Comprando" para volver al catálogo
  const btnSeguirComprando = document.getElementById("btn-seguir-comprando");
  if (btnSeguirComprando) {
    btnSeguirComprando.addEventListener("click", () => {
      mostrarPantalla("catalogo");
    });
  }

  actualizarContador();
});
