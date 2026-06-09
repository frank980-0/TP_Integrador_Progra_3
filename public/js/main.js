import { iniciarCompra } from "./pantallaInicio.js";
import { filtrarCategoria, renderizarProductos } from "./pantallaProductos.js";
import {} from "./pantallaCarrito.js";
import { generarTicket } from "./pantallaTicket.js";
import { estado, inicializarSecciones, secciones } from "./estado.js";
import { mostrarPantalla } from "./controladorPantallas.js";

//--- PANTALLA DE INICIO ---

// Esperar a que el DOM y las secciones estén listos
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    inicializarSecciones();
    iniciarApp();
  });
} else {
  inicializarSecciones();
  iniciarApp();
}

function iniciarApp() {
  console.log("Secciones cargadas:", secciones);

  const btnInicio = document.querySelector("#btn-entrar");
  if (btnInicio) {
    btnInicio.addEventListener("click", () => iniciarCompra());
  }
}

// --- PANTALLA PRODUCTOS ---
// document
//   .getElementById("btn-filtro-todos")
//   .addEventListener("click", filtrarCategoria("todos"));
// document
//   .getElementById("btn-filtro-perros")
//   .addEventListener("click", filtrarCategoria("perros"));

// document
//   .getElementById("btn-filtro-gatos")
//   .addEventListener("click", filtrarCategoria("gatos"));

// --- PANTALLA CARRITO ---

// --- PANTALLA TICKET ---
