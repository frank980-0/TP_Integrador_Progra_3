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

  iniciarCompra(); // llamar a la pantalla de inicio

function generarTicket() {
  const fecha = new Date().toLocaleString();
  const total = estado.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  
  let htmlItems = estado.carrito.map(item => 
    `<li>${item.cantidad} x ${item.nombre} (${item.variante}) - $${item.precio * item.cantidad}</li>`
  ).join('');

  const contenido = `
    <h2>Ticket de Compra</h2>
    <p><strong>Cliente:</strong> ${estado.nombreCliente}</p>
    <p><strong>Empresa:</strong> Pet Shop System</p>
    <p><strong>Fecha:</strong> ${fecha}</p>
    <hr>
    <ul>${htmlItems}</ul>
    <hr>
    <h3>Total Pagado: $${total}</h3>
    <p>¡Gracias por su compra!</p>
  `;
  
  document.getElementById('ticket-contenido').innerHTML = contenido;
}

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