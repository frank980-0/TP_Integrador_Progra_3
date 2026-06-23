import { mostrarPantalla } from "./controladorPantallas.js";

export function inicializarAdmin() {
  const formulario = document.getElementById("form-producto");

  if (!formulario) return;

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datosProducto = {
      nombre: document.getElementById("nombre").value,
      precio: parseFloat(document.getElementById("precio").value),
      tipo: document.getElementById("tipo").value,
      imagen: document.getElementById("imagen").value || null,
    };

    try {
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
        formulario.reset();
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
  const btnLogin = document.getElementById("btn-login-admin");
  const btnCrear = document.getElementById("btn-crear-admin");

  if (!btnLogin || !btnCrear) return;

  // Lógica para Iniciar Sesión
  btnLogin.addEventListener("click", async () => {
    const correo = document.getElementById("admin-correo").value;
    const password = document.getElementById("admin-password").value;

    try {
      // CORRECCIÓN: Agregamos la URL completa del backend de Express
      const respuesta = await fetch("http://localhost:3000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });
      const data = await respuesta.json();

      const cajaNotificacion = document.getElementById("caja-notificacion");

      if (respuesta.ok) {
        document.getElementById("admin-password").value = "";
        mostrarPantalla("admin");
      } else {
        cajaNotificacion.textContent =
          data.error || "Correo o contraseña incorrectos.";
        cajaNotificacion.className = "notificacion notificacion-error";

        setTimeout(() => {
          cajaNotificacion.className = "oculto";
        }, 4000);
      }
    } catch (error) {
      console.error("Error en la conexión de login:", error);
    }
  });

  // Lógica para Crear Administrador
  btnCrear.addEventListener("click", async () => {
    const correo = document.getElementById("admin-correo").value;
    const password = document.getElementById("admin-password").value;

    try {
      // CORRECCIÓN: Agregamos la URL completa del backend de Express
      const respuesta = await fetch(
        "http://localhost:3000/api/admin/registro",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo, password }),
        },
      );
      const data = await respuesta.json();

      const cajaNotificacion = document.getElementById("caja-notificacion");

      if (respuesta.ok) {
        cajaNotificacion.textContent =
          "¡Cuenta creada con éxito! Ahora podés ingresar.";
        cajaNotificacion.className = "notificacion notificacion-exito";
        document.getElementById("admin-password").value = "";
      } else {
        cajaNotificacion.textContent =
          data.error || "Error al crear la cuenta.";
        cajaNotificacion.className = "notificacion notificacion-error";
      }

      setTimeout(() => {
        cajaNotificacion.className = "oculto";
      }, 4000);
    } catch (error) {
      console.error("Error en la conexión de registro:", error);
    }
  });
}
