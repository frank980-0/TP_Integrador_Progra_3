// --- 2. NAVEGACIÓN Y PRODUCTOS ---
function filtrarCategoria(categoria) {
  if (categoria === 'todos') {
    renderizarProductos(estado.productos);
  } else {
    const filtrados = estado.productos.filter(p => p.tipo === categoria);
    renderizarProductos(filtrados);
  }
}

function renderizarProductos(lista) {
  const contenedor = document.getElementById('lista-productos');
  contenedor.innerHTML = '';
  
  lista.forEach(prod => {
    // Crear tarjeta de producto
    const card = document.createElement('div');
    card.innerHTML = `
      <h3>${prod.nombre}</h3>
      <img src="${prod.imagen}" width="100">
      <div class="variantes">
        ${prod.variantes.map(v => `
          <button onclick="agregarAlCarrito('${prod._id}', '${prod.nombre}', '${v.nombre}', ${v.precio})">
            ${v.nombre} - $${v.precio}
          </button>
        `).join('')}
      </div>
    `;
    contenedor.appendChild(card);
  });
}