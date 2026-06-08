import { estado } from "./estado.js";

// --- 2. NAVEGACIÓN Y PRODUCTOS ---

export function renderizarProductos(lista) {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";

  lista.forEach((prod) => {
    const card = document.createElement("div");

    // ✅ CORRECCIÓN: Acceder directamente a prod.variantes (que es un string)
    // Sin .map() ni bucles, ya que es un solo valor.
    card.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>Variante: ${prod.variantes}</p>
      <div class="variantes">
        <button onclick="agregarAlCarrito(${prod.id}, '${prod.nombre}', '${prod.variantes}', ${prod.precio})">
          Agregar - $${prod.precio}
        </button>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

export function filtrarCategoria(categoria) {
  if (categoria === "todos") {
    renderizarProductos(estado.productos);
  } else {
    const filtrados = estado.productos.filter((p) => p.tipo === categoria);
    renderizarProductos(filtrados);
  }
}

//    <img src="${prod.imagen}" width="100">
