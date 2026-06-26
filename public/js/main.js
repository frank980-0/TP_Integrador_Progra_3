import { iniciarCompra } from "./pantallaInicio.js";
import { filtrarCategoria, renderizarProductos } from "./pantallaProductos.js";
import { irAlCarrito } from "./pantallaCarrito.js";
import { generarTicket } from "./pantallaTicket.js";
import { estado, inicializarSecciones, secciones } from "./estado.js";
import { mostrarPantalla } from "./controladorPantallas.js";
import { inicializarAdmin, inicializarLoginAdmin } from "./admin.js";
import { cargarProductosDesdeBD } from "./producto.js";

// --- CONTROL DE ARRANQUE ---
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    inicializarSecciones();
    iniciarApp();
  });
} else {
  inicializarSecciones();
  iniciarApp();
}

// Función principal asíncrona
async function iniciarApp() {
  console.log("Secciones cargadas:", secciones);

  // --- TRÁFICO DE DATOS ---
  // Traemos los productos desde SQLite antes de montar las pantallas
  await cargarProductosDesdeBD();

  renderizarProductos(estado.productos);

  // --- BOTONES DE NAVEGACIÓN ---

  // Botón para entrar desde el inicio
  const btnInicio = document.querySelector("#btn-entrar");
  if (btnInicio) {
    btnInicio.addEventListener("click", () => iniciarCompra());
  }

  // Inicializa el formulario de carga de productos
  inicializarAdmin();

  inicializarLoginAdmin();

  // Botón del menú de navegación para abrir la sección de admin/login
  const btnIrLogin = document.querySelector("#btn-ir-login");
  if (btnIrLogin) {
    btnIrLogin.addEventListener("click", () => {
      mostrarPantalla("loginAdmin");
    });
  }
  const btnNavAdmin = document.querySelector("#btn-admin");
  if (btnNavAdmin) {
    btnNavAdmin.addEventListener("click", () => {
      mostrarPantalla("loginAdmin");
    });
  }
  const btnProductos = document.querySelector("#btn-nav-productos");
  if (btnProductos) {
    btnProductos.addEventListener("click", () => {
      mostrarPantalla("catalogo");
    });
  }

  // --- CARRITO ---
  const botonCarritoNavbar = document.querySelector("#btn-nav-carrito");
  if (botonCarritoNavbar) {
    botonCarritoNavbar.addEventListener("click", () => irAlCarrito());
  }

  // --- FILTROS (PANTALLA PRODUCTOS) ---

  const btnTodos = document.getElementById("btn-filtro-todos");
  if (btnTodos)
    btnTodos.addEventListener("click", () => filtrarCategoria("todos"));

  const btnPerros = document.getElementById("btn-filtro-perros");
  if (btnPerros)
    btnPerros.addEventListener("click", () => filtrarCategoria("perros"));

  const btnGatos = document.getElementById("btn-filtro-gatos");
  if (btnGatos)
    btnGatos.addEventListener("click", () => filtrarCategoria("gatos"));
}
