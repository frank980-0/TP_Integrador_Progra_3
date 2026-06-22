import { iniciarCompra } from "./pantallaInicio.js";
import { filtrarCategoria, renderizarProductos } from "./pantallaProductos.js";
import {} from "./pantallaCarrito.js";
import { generarTicket } from "./pantallaTicket.js";
import { estado, inicializarSecciones, secciones } from "./estado.js";
import { mostrarPantalla } from "./controladorPantallas.js";
import { inicializarAdmin } from "./admin.js";
import { cargarProductosDesdeBD } from "./producto.js";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    inicializarSecciones();
    iniciarApp();
  });
} else {
  inicializarSecciones();
  iniciarApp();
}

// hacemos async para poder cargar la db
async function iniciarApp() {
  console.log("Secciones cargadas:", secciones);

  await cargarProductosDesdeBD();

  // Si tenés una función para dibujar las tarjetas en el catálogo, la ejecutás acá:
  // renderizarProductos();

  // --- BOTONES DE NAVEGACIÓN ---

  // Botón para entrar desde el inicio
  const btnInicio = document.querySelector("#btn-entrar");
  if (btnInicio) {
    btnInicio.addEventListener("click", () => iniciarCompra());
  }

  // Panel de Administración (Formulario)
  inicializarAdmin();

  // Botón del menú de navegación para abrir la sección de admin
  const btnNavAdmin = document.querySelector("#btn-admin");
  if (btnNavAdmin) {
    btnNavAdmin.addEventListener("click", () => mostrarPantalla("admin"));
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
