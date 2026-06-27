import { API_BASE_URL } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarDetalle();
});

async function inicializarDetalle() {
  const queryParams = new URLSearchParams(window.location.search);
  const idProducto = queryParams.get("id");

  const contenedor = document.getElementById("detalle-producto");

  if (!contenedor) {
    console.error(
      "No se encontró el contenedor con id 'detalle-producto' en el HTML.",
    );
    return;
  }

  if (!idProducto) {
    contenedor.innerHTML = `<p style="color: red; text-align: center; grid-column: 1/-1;">Error: No se especificó ningún producto.</p>`;
    return;
  }

  try {
    const respuesta = await fetch(`${API_BASE_URL}/producto/${idProducto}`);

    if (!respuesta.ok) {
      throw new Error("El producto no existe o fue eliminado.");
    }

    const producto = await respuesta.json();

    // Le pasamos el contenedor ya encontrado para no volver a buscarlo mal
    pintarDatos(producto, contenedor);
  } catch (error) {
    console.error("Error al cargar el detalle:", error);
    contenedor.innerHTML = `
      <div style="text-align: center; grid-column: 1 / -1; padding: 20px;">
        <p style="color: #dc2626; font-weight: bold; font-size: 18px;">⚠️ ${error.message}</p>
        <a href="index.html" style="color: #0f766e; text-decoration: none; font-weight: 600;">Volver al Inicio</a>
      </div>
    `;
  }

  document.getElementById("btn-volver")?.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

function pintarDatos(producto, contenedor) {
  const imagenUrl =
    producto.imagen ||
    "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&auto=format&fit=crop&q=60";

  contenedor.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; ; border-radius: 12px; padding: 15px; ">
      <img src="${imagenUrl}" alt="${producto.nombre}" style="max-width:30%; max-height: 450px; object-fit: cover; border-radius: 8px;" />
    </div>

    <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div>
        <span style="display: inline-block; background-color: rgba(221, 139, 32, 0.15); color: rgb(221, 139, 32); font-size: 12px; font-weight: 700; text-transform: uppercase; padding: 6px 12px; border-radius: 6px; letter-spacing: 0.5px;">
          ${producto.tipo || "Mascotas"}
        </span>
        
        <h1 style="font-size: 34px; font-weight: 800; color: #1c1917; margin: 16px 0 8px 0; line-height: 1.2;">
          ${producto.nombre}
        </h1>
        
        <p style="font-size: 14px; color: #78716c; margin: 0 0 24px 0;">
          Variante: <strong style="color: #44403c;">${producto.variantes || "Única"}</strong>
        </p>
        
        <p style="font-size: 40px; font-weight: 900; color: rgb(221, 139, 32); margin: 0 0 24px 0; tracking-spacing: -0.5px;">
          $${producto.precio.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
        </p>
        
        <hr style="border: 0; border-top: 1px solid #e7e5e4; margin-bottom: 24px;" />
        
        <p style="font-size: 16px; color: #57534e; line-height: 1.7; margin: 0 0 32px 0;">
          ${producto.descripcion || "Este excelente producto premium está diseñado para garantizar el máximo confort y bienestar de tu mascota."}
        </p>
      </div>
        <div style="display: flex; justify-content: center; width: 100%; mt-4; margin-bottom: 20px;">
  
  <button id="btn-agregar-detalle" style="width: 50%; background-color: rgb(17, 81, 17); color: white; border: none; padding: 14px; font-size: 16px; font-weight: bold; border-radius: 8px; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px;">
    <img src="./img/carrito.svg" alt="Carrito" style="width: 20px; filter: brightness(0) invert(1);" />
    Agregar al carrito
  </button>

</div>
    </div>
  `;

  // Listener del carrito
  document
    .getElementById("btn-agregar-detalle")
    ?.addEventListener("click", () => {
      alert(`¡${producto.nombre} se agregó al carrito!`);
    });
}
