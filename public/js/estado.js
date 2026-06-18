export let estado = {
  nombreCliente: "",
  carrito: [], // Array de objetos: { id, nombre, variante, precio, cantidad }
  productos: [],
  // arreglar productos despues, ya que me genera conflictos con las pantallas
};

export const secciones = {};

// Inicializar las secciones solo cuando el DOM esté listo
function inicializarSecciones() {
  secciones.bienvenida = document.getElementById("pantalla-inicio");
  secciones.catalogo = document.getElementById("pantalla-productos");
  secciones.carrito = document.getElementById("pantalla-carrito");
  secciones.ticket = document.getElementById("pantalla-ticket");
  secciones.admin = document.getElementById("seccion-admin");

  // Validar que todo cargó correctamente
  Object.entries(secciones).forEach(([clave, valor]) => {
    if (!valor) {
      console.error(
        `Error crítico: No se encontró el elemento con ID correspondiente a "${clave}". Revisar tu HTML.`,
      );
    }
  });
}

// Ejecutar inicialización
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializarSecciones);
} else {
  inicializarSecciones();
}

export { inicializarSecciones };
