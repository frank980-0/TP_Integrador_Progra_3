<<<<<<< HEAD
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
  loginAdmin: document.getElementById('pantalla-login-admin'),
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

// Botón para entrar al catálogo de productos
document.getElementById('btn-entrar').addEventListener('click', () => {
  mostrarPantalla('catalogo'); 
});

// Botón para entrar al login de Administrador
document.getElementById('btn-admin').addEventListener('click', () => {
  mostrarPantalla('loginAdmin');
});

// Botón para entrar al panel de Administrador
document.getElementById('btn-validar-admin').addEventListener('click', () => {
  // Capturamos lo que el usuario escribió
  const usuario = document.getElementById('input-admin-user').value;
  const pass = document.getElementById('input-admin-pass').value;

  // Simulamos la base de datos (acá poné la contraseña que quieras)
  if (usuario === 'admin' && pass === '123456') {
    // Si es correcto, lo dejamos pasar al panel
    mostrarPantalla('admin');
    
    // Limpiamos los inputs por si cierra sesión y vuelve a entrar
    document.getElementById('input-admin-user').value = '';
    document.getElementById('input-admin-pass').value = '';
  } else {
    alert('Usuario o contraseña incorrectos. ¡Acceso denegado!');
  }
});

// Botón para arrepentirse y volver al inicio
document.getElementById('btn-cancelar-admin').addEventListener('click', () => {
  // Limpiamos los inputs antes de irnos
  document.getElementById('input-admin-user').value = '';
  document.getElementById('input-admin-pass').value = '';
  mostrarPantalla('bienvenida');
});


// Botón para salir del panel y volver a la bienvenida
document.getElementById('btn-volver-admin').addEventListener('click', () => {
  mostrarPantalla('bienvenida');
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
=======
import { iniciarCompra } from "./pantallaInicio.js";
import { filtrarCategoria, renderizarProductos } from "./pantallaProductos.js";
import {} from "./pantallaCarrito.js";
import { generarTicket } from "./pantallaTicket.js";
import { estado, inicializarSecciones, secciones } from "./estado.js";
import { mostrarPantalla } from "./controladorPantallas.js";

//--- PANTALLA DE INICIO ---

// Esperar a que el DOM y las secciones estén listos
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    inicializarSecciones();
    iniciarApp();
  });
} else {
  inicializarSecciones();
  iniciarApp();
}

function iniciarApp() {
  console.log("Secciones cargadas:", secciones);

  const btnInicio = document.querySelector("#btn-entrar");
  if (btnInicio) {
    btnInicio.addEventListener("click", () => iniciarCompra());
  }
}

// --- PANTALLA PRODUCTOS ---
// document
//   .getElementById("btn-filtro-todos")
//   .addEventListener("click", filtrarCategoria("todos"));
// document
//   .getElementById("btn-filtro-perros")
//   .addEventListener("click", filtrarCategoria("perros"));

// document
//   .getElementById("btn-filtro-gatos")
//   .addEventListener("click", filtrarCategoria("gatos"));

// --- PANTALLA CARRITO ---

// --- PANTALLA TICKET ---
>>>>>>> branchfs
