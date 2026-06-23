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
      const respuesta = await fetch("http://localhost:3000/api/producto", {
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

     const cajaNotificacion = document.getElementById('caja-notificacion');

    if (respuesta.ok) {
      // Éxito: No mostramos cartel porque lo teletransportamos directo al panel
      document.getElementById('admin-password').value = '';
      mostrarPantalla('admin'); // ACÁ usamos el nombre de pantalla correcto
    } else {
      // Error de login (ej: contraseña mal): cartel rojo
      cajaNotificacion.textContent = data.error || 'Correo o contraseña incorrectos.';
      cajaNotificacion.className = 'notificacion notificacion-error';
      
      // Que desaparezca solo
      setTimeout(() => {
          cajaNotificacion.className = 'oculto';
      }, 4000);
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

      const cajaNotificacion = document.getElementById('caja-notificacion');

    if (respuesta.ok) {
      // Éxito: cartel verde
      cajaNotificacion.textContent = '¡Cuenta creada con éxito! Ahora podés ingresar.';
      cajaNotificacion.className = 'notificacion notificacion-exito';
      document.getElementById('admin-password').value = ''; 
    } else {
      // Error: cartel rojo
      cajaNotificacion.textContent = data.error || 'Error al crear la cuenta.';
      cajaNotificacion.className = 'notificacion notificacion-error';
    }

    // Que desaparezca solo a los 4 segundos
    setTimeout(() => {
        cajaNotificacion.className = 'oculto';
    }, 4000);

  } catch (error) {
    console.error(error);
  }
  });
}
