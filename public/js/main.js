import { iniciarCompra } from "./pantallaInicio.js";
import { filtrarCategoria, renderizarProductos } from "./pantallaProductos.js";
import {} from "./pantallaCarrito.js";
import { generarTicket } from "./pantallaTicket.js";
import { estado, inicializarSecciones, secciones } from "./estado.js";
import { mostrarPantalla } from "./controladorPantallas.js";
import { inicializarAdmin } from "./admin.js";
import { inicializarLoginAdmin } from './admin.js';
import { irALoginAdmin, volverAlInicioDesdeLogin } from './pantallaInicio.js';

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

  // Conectamos el botón naranja "Administrador" de la pantalla de inicio
    const btnAdminInicio = document.getElementById("btn-administrador"); 
    if (btnAdminInicio) {
      btnAdminInicio.addEventListener("click", irALoginAdmin);
    }

    // Conectamos el botón de volver atrás del login
    const btnVolver = document.getElementById("btn-volver-inicio");
    if (btnVolver) {
      btnVolver.addEventListener("click", volverAlInicioDesdeLogin);
    }

    // Encendemos la lógica de la base de datos del login
    inicializarLoginAdmin();


    /*
  // 2. Le damos funcionalidad al botón del menú para abrir la pantalla de admin
  const btnNavAdmin = document.querySelector("#btn-admin");
  if (btnNavAdmin) {
    btnNavAdmin.addEventListener("click", () => mostrarPantalla("admin"));
  }*/
}

