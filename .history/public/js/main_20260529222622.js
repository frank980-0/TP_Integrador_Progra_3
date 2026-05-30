import { cargarProductos } from './pantallaCarrito.js';
import { iniciarCompra } from './pantallaInicio.js';
import {} from './pantallaProductos.js';
import {} from './pantallaTicket.js';


// --- ESTADO GLOBAL ---
let estado = {
  nombreCliente: '',
  carrito: [], // Array de objetos: { id, nombre, variante, precio, cantidad }
  productos: [] // Aquí cargarás tus datos (mock o API)
};


// --- 1. INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  cargarProductos(estado); // Cargar productos al estado
  actualizarContador(); // Mostrar contador inicial (0)
  mostrarPantalla('pantalla-bienvenida'); // Mostrar bienvenida
});
  iniciarCompra(); // llamar a la pantalla de inicio












// --- 5. REINICIO ---
function reiniciarSistema() {
  estado.nombreCliente = '';
  estado.carrito = [];
  actualizarContador();
  document.getElementById('input-nombre').value = '';
  mostrarPantalla('pantalla-bienvenida');
}

// --- UTILIDAD: NAVEGACIÓN ---
function mostrarPantalla(idPantalla) {
  // Ocultar todas
  document.querySelectorAll('section').forEach(sec => sec.classList.add('oculta'));
  // Mostrar la deseada
  document.getElementById(idPantalla).classList.remove('oculta');
}

function volverAProductos() {
  mostrarPantalla('pantalla-productos');
}   