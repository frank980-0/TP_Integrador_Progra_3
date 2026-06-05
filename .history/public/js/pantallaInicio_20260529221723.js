
// --- 1. BIENVENIDA ---
function iniciarCompra() {
  const nombre = document.getElementById('input-nombre').value;
  if (!nombre.trim()) return alert("Por favor ingresa tu nombre");
  
  estado.nombreCliente = nombre;
  mostrarPantalla('pantalla-productos');
  renderizarProductos(estado.productos); // Carga los productos
}