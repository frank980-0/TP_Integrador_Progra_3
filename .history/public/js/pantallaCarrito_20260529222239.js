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