import { mostrarPantalla } from "./controladorPantallas.js";
import { API_BASE_URL } from "./config.js";

export function inicializarAdmin() {
  const formulario = document.getElementById("form-producto");
  const btnInicio = document.getElementById("btn-volver-inicio");

  if (!formulario) return;

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datosProducto = {
      nombre: document.getElementById("nombre").value,
      precio: parseFloat(document.getElementById("precio").value),
      tipo: document.getElementById("tipo").value,
      imagen: document.getElementById("imagen").value || null,
    };

    const idEdicion = formulario.dataset.editandoId;
    let metodoFetch = "POST";
    let urlFetch = `${API_BASE_URL}/producto`;

    if (idEdicion) {
      metodoFetch = "PUT";
      urlFetch = `${API_BASE_URL}/producto/${idEdicion}`;
    }

    try {
      const respuesta = await fetch(urlFetch, {
        method: metodoFetch,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosProducto),
        credentials: "include", // ⚡ CORRECCIÓN: Envía la cookie de sesión al backend
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        alert("¡Producto guardado con éxito en la base de datos!");
        formulario.reset();
        delete formulario.dataset.editandoId;
        document.querySelector(".btn-guardar").textContent = "Guardar Producto";
        cargarTablaDashboard();
      } else {
        alert(`Error: ${resultado.error}`);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("No se pudo conectar con el servidor backend.");
    }
  });

  if (btnInicio) {
    btnInicio.addEventListener("click", () => {
      mostrarPantalla("bienvenida");
    });
  }
  cargarTablaDashboard();
}

export function inicializarLoginAdmin() {
  const btnLogin = document.getElementById("btn-login-admin");
  const btnCrear = document.getElementById("btn-crear-admin");

  if (!btnLogin || !btnCrear) return;

  // Lógica para Iniciar Sesión
  btnLogin.addEventListener("click", async () => {
    const correo = document.getElementById("admin-correo").value;
    const password = document.getElementById("admin-password").value;

    try {
      const respuesta = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
        credentials: "include", // ⚡ CORRECCIÓN: Obliga a Chrome a recibir y guardar la cookie que manda Express
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
      const respuesta = await fetch(`${API_BASE_URL}/admin/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });
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

async function cargarTablaDashboard() {
  try {
    const respuesta = await fetch(`${API_BASE_URL}/producto`, {
      credentials: "include", // ⚡ OPCIONAL PERO RECOMENDABLE: Por si el GET de productos también se protege a futuro
    });

    if (!respuesta.ok) {
      throw new Error("Error al obtener los productos");
    }

    const productos = await respuesta.json();
    const cuerpoTabla = document.getElementById("cuerpo-tabla");
    cuerpoTabla.innerHTML = "";

    productos.forEach((producto) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td>
          <button class="btn-modificar" onclick="prepararEdicion(${producto.id}, '${producto.nombre}', ${producto.precio}, '${producto.tipo}', '${producto.imagen}')">Modificar</button>
          <button class="btn-eliminar" onclick="borrarProducto(${producto.id})">Eliminar</button>
        </td>
      `;
      cuerpoTabla.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al cargar el dashboard:", error);
  }
}

window.prepararEdicion = (id, nombre, precio, tipo, imagen) => {
  document.getElementById("nombre").value = nombre;
  document.getElementById("precio").value = precio;
  document.getElementById("tipo").value = tipo || "";
  document.getElementById("imagen").value =
    imagen && imagen !== "null" ? imagen : "";

  const formulario = document.getElementById("form-producto");
  formulario.dataset.editandoId = id;
  document.querySelector(".btn-guardar").textContent = "Actualizar Producto";
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.borrarProducto = async (id) => {
  if (!confirm("¿Estás seguro de que querés dar de baja este producto?"))
    return;

  try {
    const respuesta = await fetch(`${API_BASE_URL}/producto/${id}`, {
      method: "DELETE",
      credentials: "include", // ⚡ CORRECCIÓN: Para que te deje eliminar productos sin rebotar
    });

    if (respuesta.ok) {
      alert("¡Producto eliminado correctamente!");
      cargarTablaDashboard();
    } else {
      alert("Hubo un error al intentar eliminar.");
    }
  } catch (error) {
    console.error("Error al borrar:", error);
  }
};
