import {  } from './pantallaInicio.js';
import { renderizarProductos, productosDb } from './pantallaProductos.js';
import {  } from './pantallaCarrito.js';
import {  } from './pantallaTicket.js';

// --- ESTADO GLOBAL ---
let estado = {
  nombreCliente: '',
  carrito: [], // Array de objetos: { id, nombre, variante, precio, cantidad }
  productos: productosDb // Aquí cargarás tus datos (mock o API)
};


// 1. Capturamos todas las secciones
const secciones = {
  bienvenida: document.getElementById('pantalla-inicio'),
  catalogo: document.getElementById('pantalla-productos'),
  carrito: document.getElementById('pantalla-carrito'),
  ticket: document.getElementById('pantalla-ticket'),
  admin: document.getElementById('pantalla-admin'),
  loginAdmin: document.getElementById('pantalla-login-admin')
};



// 2. Función maestra para cambiar pantallas
export function mostrarPantalla(pantallaDeseada) {
  // Primero, le ponemos la clase "oculta" a TODAS
  Object.values(secciones).forEach(seccion => {
    seccion.classList.add('oculta');
  });

  // Segundo, se la sacamos SOLO a la que queremos ver
  secciones[pantallaDeseada].classList.remove('oculta');
}

// 3. Asignamos los eventos a los botones de navegación
document.getElementById('btn-entrar').addEventListener('click', () => {
  // Acá podrías capturar el nombre del input y guardarlo en tu estado global antes de cambiar
  mostrarPantalla('catalogo'); 
});

// Botón para entrar al panel de Administrador
document.getElementById('btn-admin').addEventListener('click', () => {
  mostrarPantalla('loginAdmin');
});

// Botón para entrar al panel de Administrador
document.getElementById('btn-validar-admin').addEventListener('click', () => {
  mostrarPantalla('admin');
});









/*
document.getElementById('btn-ver-carrito').addEventListener('click', () => {
  mostrarPantalla('carrito');
});

document.getElementById('btn-seguir-comprando').addEventListener('click', () => {
  mostrarPantalla('catalogo');
});*/


// Arrancamos mostrando solo el inicio
mostrarPantalla('bienvenida');




//--- PANTALLA DE INICIO ---

//iniciarCompra();


// --- PANTALLA PRODUCTOS ---

renderizarProductos(estado.productos);



// --- PANTALLA CARRITO ---
//cargarProductos();


// --- PANTALLA TICKET ---
//generarTicket();



























/*

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
}   */