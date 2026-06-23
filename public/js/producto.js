import { estado } from "./estado.js";

export async function cargarProductosDesdeBD() {
  try {
    // Hacemos la petición GET al servidor (puerto 3000)
    const respuesta = await fetch("http://localhost:3000/api/producto");

    if (!respuesta.ok) {
      throw new Error("No se pudo obtener la lista de productos del servidor");
    }

    const productosBD = await respuesta.json();

    estado.productos = productosBD;

    console.log(
      "¡Estado actualizado con los productos de la DB!",
      estado.productos,
    );

    // [OPCIONAL] Acá deberías llamar a la función que dibuja las tarjetas en el HTML
    // renderizarCatalogo();
  } catch (error) {
    console.error("Error al cargar los productos en el frontend:", error);
  }
}
