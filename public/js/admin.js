export function inicializarAdmin() {
  const formulario = document.getElementById("form-producto");

  if (!formulario) return;

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evitamos que la página se recargue

    // Capturamos los datos del admin
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
