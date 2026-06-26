const API_BASE_URL = 'http://localhost:3000/api';

// Apenas carga la pantalla, vamos a buscar los LOGs
document.addEventListener('DOMContentLoaded', () => {
    cargarLogs();
});

async function cargarLogs() {
  try {
    // Le pegamos a la ruta protegida que creaste hace un rato
    const respuesta = await fetch(`${API_BASE_URL}/admin/logs`, {
      method: 'GET',
      // Fundamental: como usamos cookies para el token de admin, le decimos al fetch que las envíe
      credentials: 'include' // Ojo: lo cambiamos en el próximo paso según cómo lea tu middleware
    });

    if (!respuesta.ok) throw new Error('Error al traer los logs');
    
    const logs = await respuesta.json();
    const tbody = document.getElementById('tbody-logs');
    tbody.innerHTML = ''; // Limpiamos la tabla por las dudas

    // Recorremos los datos y armamos las filas
    logs.forEach(log => {
      // Formateamos la fecha para que se vea linda (Día/Mes/Año Hora:Minutos)
      const fechaFormateada = new Date(log.fecha_hora).toLocaleString('es-AR');

      tbody.innerHTML += `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">${fechaFormateada}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${log.admin}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${log.ip || 'Desconocida'}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Fallo la carga de LOGs:", error);
    document.getElementById('tbody-logs').innerHTML = `<tr><td colspan="3" style="text-align:center; padding:15px; color:red;">No se pudieron cargar los registros. Verifica tu sesión.</td></tr>`;
  }
}