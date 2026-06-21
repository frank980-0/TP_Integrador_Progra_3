import { mostrarPantalla } from './controladorPantallas.js';

export function inicializarAdmin() {
  const formulario = document.getElementById("form-producto");

  if (!formulario) return;

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evitamos que la página se recargue

    // Capturamos los datos del producto
    const datosProducto = {
      nombre: document.getElementById("nombre").value,
      precio: parseFloat(document.getElementById("precio").value),
      tipo: document.getElementById("tipo").value,
      imagen: document.getElementById("imagen").value || null,
    };

    try {
      // Hacemos la petición POST al servidor Express
      const respuesta = await fetch("/api/producto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosProducto),
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        alert("¡Producto guardado con éxito en la base de datos!");
        formulario.reset(); // Limpiamos los campos del formulario
      } else {
        alert(`Error: ${resultado.mensaje}`);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("No se pudo conectar con el servidor backend.");
    }
  });
}



// Función para inicializar los botones de la pantalla de LOGIN
export function inicializarLoginAdmin() {
  const btnLogin = document.getElementById('btn-login-admin');
  const btnCrear = document.getElementById('btn-crear-admin');

  // Si no estamos en la pantalla correcta, cortamos la ejecución
  if (!btnLogin || !btnCrear) return;

  // Lógica para Iniciar Sesión
  btnLogin.addEventListener('click', async () => {
    const correo = document.getElementById('admin-correo').value;
    const password = document.getElementById('admin-password').value;

    try {
      const respuesta = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      });
      const data = await respuesta.json();

      if (respuesta.ok) {
        alert('¡Bienvenido Administrador!');
        // Importante: Acá le decimos que cambie al panel de carga de productos
        // Asegurate de importar mostrarPantalla arriba si la vas a usar acá
       
        mostrarPantalla('loginAdmin');
        document.getElementById('pantalla-login-admin').classList.add('oculta');
        document.getElementById('seccion-admin').classList.remove('oculta'); 
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error(error);
    }
  });

  // Lógica para Crear Administrador
  btnCrear.addEventListener('click', async () => {
    const correo = document.getElementById('admin-correo').value;
    const password = document.getElementById('admin-password').value;

    try {
      const respuesta = await fetch('/api/admin/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      });
      const data = await respuesta.json();

      if (respuesta.ok) {
        alert('¡Cuenta creada con éxito! Ahora podés ingresar.');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error(error);
    }
  });
}