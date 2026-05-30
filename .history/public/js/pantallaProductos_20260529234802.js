// 1. IMPORTACIONES (Si tenés tus productos en otro archivo)
// import { productosDb } from './pantallaProductos.js';

// Si no los tenés separados aún, usamos esta base de prueba:
export const productosDb = [
  { id: 1, nombre: 'Collar ajustable talle M', tipo: 'perro', precio: 5000 },
  { id: 2, nombre: 'Hueso de goma resistente', tipo: 'perro', precio: 2500 },
  { id: 3, nombre: 'Ratón de tela con sonido', tipo: 'gato', precio: 1500 },
  { id: 4, nombre: 'Torre rascador de 3 pisos', tipo: 'gato', precio: 18000 },
  { id: 5, nombre: 'Cepillo deslanador', tipo: 'ambos', precio: 4000 } 
];

// 2. CAPTURAMOS LOS ELEMENTOS DEL DOM
const contenedorProductos = document.getElementById('lista_productos');
const btnTodos = document.getElementById('btn-filtro-todos');
const btnPerros = document.getElementById('btn-filtro-perros');
const btnGatos = document.getElementById('btn-filtro-gatos');

// 3. FUNCIÓN PARA DIBUJAR LOS PRODUCTOS
function renderizarProductos(arrayProductos) {
  // Primero vaciamos el contenedor
  contenedorProductos.innerHTML = '';

  // Recorremos el array y creamos las tarjetitas
  arrayProductos.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'producto-card'; // Podés darle estilos con CSS a esta clase
    card.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button>Agregar al Carrito</button>
    `;
    contenedorProductos.appendChild(card);
  });
}

// 4. EVENT LISTENERS (La forma moderna y limpia)
btnTodos.addEventListener('click', () => {
  renderizarProductos(productosDb);
});

btnPerros.addEventListener('click', () => {
  // Filtramos solo los que son para perro o sirven para ambos
  const filtrados = productosDb.filter(prod => prod.tipo === 'perro' || prod.tipo === 'ambos');
  renderizarProductos(filtrados);
});

btnGatos.addEventListener('click', () => {
  // Filtramos solo los que son para gato o sirven para ambos
  const filtrados = productosDb.filter(prod => prod.tipo === 'gato' || prod.tipo === 'ambos');
  renderizarProductos(filtrados);
});

// 5. INICIALIZACIÓN
// Cuando cargue la página, mostramos todos por defecto
renderizarProductos(productosDb);