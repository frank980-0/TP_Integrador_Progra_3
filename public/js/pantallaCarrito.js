<<<<<<< HEAD

// --- 3. GESTIÓN DEL CARRITO ---
function agregarAlCarrito(id, nombre, variante, precio) {
  // Buscar si ya existe ese item exacto en el carrito
  const itemExistente = estado.carrito.find(item => item.id === id && item.variante === variante);
  
=======
import { estado } from "./estado.js";

// --- 3. GESTIÓN DEL CARRITO ---
export function agregarAlCarrito(id, nombre, variante, precio) {
  // Buscar si ya existe ese item exacto en el carrito
  const itemExistente = estado.carrito.find(
    (item) => item.id === id && item.variante === variante,
  );

>>>>>>> branchfs
  if (itemExistente) {
    itemExistente.cantidad++; // Sumar cantidad si ya existe
  } else {
    // Crear nuevo item
    estado.carrito.push({ id, nombre, variante, precio, cantidad: 1 });
  }
<<<<<<< HEAD
  
=======

>>>>>>> branchfs
  actualizarContador();
  alert("Producto agregado");
}

<<<<<<< HEAD
function eliminarProductoDelCarrito(index) {
=======
export function eliminarProductoDelCarrito(index) {
>>>>>>> branchfs
  estado.carrito.splice(index, 1); // Eliminar por índice
  renderizarCarrito();
  actualizarContador();
}

<<<<<<< HEAD
function cambiarCantidad(index, delta) {
  const item = estado.carrito[index];
  item.cantidad += delta;
  
=======
export function cambiarCantidad(index, delta) {
  const item = estado.carrito[index];
  item.cantidad += delta;

>>>>>>> branchfs
  if (item.cantidad <= 0) {
    eliminarProductoDelCarrito(index);
  } else {
    renderizarCarrito();
  }
}

<<<<<<< HEAD
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
=======
export function actualizarContador() {
  const totalItems = estado.carrito.reduce(
    (sum, item) => sum + item.cantidad,
    0,
  );
  document.getElementById("contador-carrito").innerText = totalItems;
}

// --- 4. VISTAS DEL CARRITO Y TICKET ---
export function irAlCarrito() {
  renderizarCarrito();
  mostrarPantalla("pantalla-carrito");
}

export function renderizarCarrito() {
  const contenedor = document.getElementById("lista-carrito-detalle");
  contenedor.innerHTML = "";
>>>>>>> branchfs
  let total = 0;

  estado.carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
<<<<<<< HEAD
    
=======

>>>>>>> branchfs
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
<<<<<<< HEAD
  
  document.getElementById('total-carrito').innerText = total;
}

function finalizarCompra() {
  if (estado.carrito.length === 0) return alert("El carrito está vacío");
  
  generarTicket();
  mostrarPantalla('pantalla-ticket');
}
=======

  document.getElementById("total-carrito").innerText = total;
}

export function finalizarCompra() {
  if (estado.carrito.length === 0) return alert("El carrito está vacío");

  generarTicket();
  mostrarPantalla("pantalla-ticket");
}
>>>>>>> branchfs
