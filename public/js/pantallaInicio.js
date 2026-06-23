import { estado, secciones } from "./estado.js";
import { renderizarProductos } from "./pantallaProductos.js";
import { mostrarPantalla } from "./controladorPantallas.js";

// --- 1. BIENVENIDA ---
export function iniciarCompra() {
  const nombre = document.getElementById("input-nombre").value;
  if (!nombre.trim()) return alert("Por favor ingresa tu nombre");

  const navbar = document.getElementById("barra-navegacion");
  if (navbar) {
    navbar.classList.remove("oculta");
  }

  estado.nombreCliente = nombre;
  mostrarPantalla("catalogo");
  renderizarProductos(estado.productos); // Carga los productos
}
