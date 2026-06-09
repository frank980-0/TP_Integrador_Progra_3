import { cargarProductos } from './pantallaCarrito.js';
import { iniciarCompra } from 'pantallaInicio.js';
import { renderizarProductos, filtrarCategoria } from './productos.js';

// --- ESTADO GLOBAL ---
let estado = {
  nombreCliente: '',
  carrito: [], // Array de objetos: { id, nombre, variante, precio, cantidad }
  productos: [] // Aquí cargarás tus datos (mock o API)
};

  iniciarCompra(); // llamar a la pantalla de inicio

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

// --- 4. VISTAS DEL CARRITO Y TICKET ---
function irAlCarrito() {
  renderizarCarrito();
  mostrarPantalla('pantalla-carrito');
}

function renderizarCarrito() {
  const contenedor = document.getElementById('lista-carrito-detalle');
  contenedor.innerHTML = '';
  let total = 0;

  estado.carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    
    contenedor.innerHTML += `
      <div class="item-carrito">
        <p>${item.nombre} (${item.variante})</p>
        <div>
          <button onclick="cambiarCantidad(${index}, -1)">-</button>
          <span>${item.cantidad}</span>
          <button onclick="cambiarCantidad(${index}, 1)">+</button>
        </div>
        <p>$${subtotal}</p>
        <button onclick="eliminarProductoDelCarrito(${index})" style="background:red">Eliminar</button>
      </div>
    `;
  });
  
  document.getElementById('total-carrito').innerText = total;
}

function finalizarCompra() {
  if (estado.carrito.length === 0) return alert("El carrito está vacío");
  
  generarTicket();
  mostrarPantalla('pantalla-ticket');
}

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