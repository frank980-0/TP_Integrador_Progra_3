// --- 3. GESTIÓN DEL CARRITO ---
function agregarAlCarrito(id, nombre, variante, precio) {
  // Buscar si ya existe ese item exacto en el carrito
  const itemExistente = estado.carrito.find(item => item.id === id && item.variante === variante);
  
  if (itemExistente) {
    itemExistente.cantidad++; // Sumar cantidad si ya existe
  } else {
    // Crear nuevo item
    estado.carrito.push({ id, nombre, variante, precio, cantidad: 1 });
  }
  
  actualizarContador();
  alert("Producto agregado");
}



function eliminarProductoDelCarrito(index) {
  estado.carrito.splice(index, 1); // Eliminar por índice
  renderizarCarrito();
  actualizarContador();
}

function cambiarCantidad(index, delta) {
  const item = estado.carrito[index];
  item.cantidad += delta;
  
  if (item.cantidad <= 0) {
    eliminarProductoDelCarrito(index);
  } else {
    renderizarCarrito();
  }
}

function actualizarContador() {
  const totalItems = estado.carrito.reduce((sum, item) => sum + item.cantidad, 0);
  document.getElementById('contador-carrito').innerText = totalItems;
}