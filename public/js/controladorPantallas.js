import { secciones } from "./estado.js";

export function mostrarPantalla(pantallaDeseada) {
  // ocultamos todas las pantallas
  Object.values(secciones).forEach((seccion) => {
    seccion.classList.add("oculta");
  });

  secciones[pantallaDeseada].classList.remove("oculta");
}
