import { cargarProductos } from './pantallaCarrito.js';
import { iniciarCompra } from './pantallaInicio.js';
import { filtrarCategoria, renderizarProductos,  } from './pantallaProductos.js';
import { generarTicket } from './pantallaTicket.js';


// --- ESTADO GLOBAL ---
let estado = {
  nombreCliente: '',
  carrito: [], // Array de objetos: { id, nombre, variante, precio, cantidad }
  productos: [] // Aquí cargarás tus datos (mock o API)
};


//--- PANTALLA DE INICIO ---
iniciarCompra();


// --- PANTALLA PRODUCTOS ---

renderizarProductos();



// --- PANTALLA CARRITO ---
cargarProductos();


// --- PANTALLA TICKET ---
generarTicket();











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