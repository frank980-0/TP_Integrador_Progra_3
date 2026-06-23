import { estado } from "./estado.js";

// NAVEGACIÓN Y PRODUCTOS

export function renderizarProductos(lista) {
  const contenedor = document.getElementById("lista-productos");

  if (!contenedor) {
    console.warn("No se encontró el contenedor #lista-productos en el HTML.");
    return;
  }

  contenedor.innerHTML = "";

  if (!lista || lista.length === 0) {
    contenedor.innerHTML = `<p class="texto-vacio">No hay productos disponibles en este momento.</p>`;
    return;
  }

  lista.forEach((prod) => {
    const card = document.createElement("div");
    card.className = "tarjeta-producto";

    // Si tu base de datos maneja imágenes, la usamos; si no, dejamos una por defecto
    const imagenUrl =
      prod.imagen ||
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&auto=format&fit=crop&q=60";

    card.innerHTML = `
      <div class="producto-imagen-wrapper">
        <img src="${imagenUrl}" alt="${prod.nombre}" />
        <span class="producto-badge">${prod.tipo}</span>
      </div>

      <div class="producto-info">
        <div>
          <h3 class="producto-titulo">${prod.nombre}</h3>
          <p class="producto-variante">Variante: ${prod.variantes || "Única"}</p>
          <p class="producto-precio">$${prod.precio.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</p>
        </div>
        
        <button class="btn-agregar-carrito">
          <img src="./img/carrito.svg" alt="Carrito" class="nav-icon" />
          Agregar al carrito
        </button>
      </div>
    `;

    // CORRECCIÓN CRÍTICA: Escuchador de eventos nativo en lugar de 'onclick' en el HTML string
    const botonAgregar = card.querySelector(".btn-agregar-carrito");
    botonAgregar.addEventListener("click", () => {
      // Si tenés tu función agregarAlCarrito importada, se ejecuta acá limpiamente:
      if (typeof window.agregarAlCarrito === "function") {
        window.agregarAlCarrito(
          prod.id,
          prod.nombre,
          prod.variantes,
          prod.precio,
        );
      } else {
        // Opción recomendada: importar la función arriba y llamarla directo:
        // agregarAlCarrito(prod.id, prod.nombre, prod.variantes, prod.precio);
        console.log(`Producto agregado: ${prod.nombre}`);
      }
    });

    contenedor.appendChild(card);
  });
}

export function filtrarCategoria(categoria) {
  if (categoria === "todos") {
    renderizarProductos(estado.productos);
  } else {
    // Convertimos ambos a minúsculas para evitar problemas si en la BD se guardó "Perros" o "perros"
    const filtrados = estado.productos.filter(
      (p) => p.tipo?.toLowerCase() === categoria.toLowerCase(),
    );
    renderizarProductos(filtrados);
  }
}
