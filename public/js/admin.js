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
    
    // 2. DECLARAMOS las variables dinámicas (Acá buscamos el ID oculto)
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
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        alert("¡Producto guardado con éxito en la base de datos!");
        formulario.reset();

        // 2. Le borramos el ID oculto para que vuelva a estar en modo "Alta"
        delete formulario.dataset.editandoId; 
        
        // 3. Volvemos el botón a la normalidad
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
      const respuesta = await fetch(`${API_BASE_URL}/admin/login`, {
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


// Función para traer los productos y pintar la tabla del Dashboard
async function cargarTablaDashboard() {
  try {
    // 1. Mandamos al mensajero a buscar la lista de productos al backend
    // (Asegurate de que esta ruta coincida con tu endpoint GET de productos)
    const respuesta = await fetch(`${API_BASE_URL}/producto`);

    if (!respuesta.ok) {
      throw new Error('Error al obtener los productos');
    }

    const productos = await respuesta.json();

    // 2. Apuntamos al cuerpo de la tabla en el HTML
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    cuerpoTabla.innerHTML = ''; // Limpiamos la tabla por si tenía datos viejos

    // 3. Iteramos el array de productos y armamos las filas
    productos.forEach(producto => {
      const fila = document.createElement('tr');

      // Inyectamos las variables directamente en el HTML de la fila
      // Y fíjate cómo ya dejamos listos los botones con el ID de cada producto
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


// =========================================================
//  MODIFICACIÓN DE PRODUCTOS DESDE EL DASHBOARD
// =========================================================

// 1. Función para subir los datos al formulario (Modificar)
window.prepararEdicion = (id, nombre, precio, tipo, imagen) => {
  // Llenamos los inputs con los datos de la fila
  document.getElementById("nombre").value = nombre;
  document.getElementById("precio").value = precio;
  document.getElementById("tipo").value = tipo || "";
  document.getElementById("imagen").value = (imagen && imagen !== 'null') ? imagen : "";

  // Le guardamos el ID de forma oculta al formulario
  const formulario = document.getElementById("form-producto");
  formulario.dataset.editandoId = id;

  // Cambiamos el texto del botón para que quede claro que estamos editando
  document.querySelector(".btn-guardar").textContent = "Actualizar Producto";
  
  // Scrolleamos la pantalla hacia arriba suavemente
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


// =========================================================
//  ELIMINACIÓN DE PRODUCTOS DESDE EL DASHBOARD
// =========================================================
window.borrarProducto = async (id) => {
  if (!confirm("¿Estás seguro de que querés dar de baja este producto?")) return;
  
  try {
    const respuesta = await fetch(`${API_BASE_URL}/producto/${id}`, {
      method: "DELETE"
    });

    if (respuesta.ok) {
      alert("¡Producto eliminado correctamente!");
      // Llamamos a la función que recarga la grilla
      cargarTablaDashboard(); 
    } else {
      alert("Hubo un error al intentar eliminar.");
    }
  } catch (error) {
    console.error("Error al borrar:", error);
  }
};
