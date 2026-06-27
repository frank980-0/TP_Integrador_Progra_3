const API_BASE_URL = 'http://localhost:3000/api';

// Apenas carga la pantalla, vamos a buscar los LOGs
document.addEventListener('DOMContentLoaded', () => {
    cargarLogs();
});

document.addEventListener('DOMContentLoaded', () => {
    cargarLogs();
    cargarEstadisticas(); // <-- Agregá esta línea para que se ejecute al abrir la pantalla
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


// ==========================================
// CARGAR LAS ESTADÍSTICAS Y TOP 10
// ==========================================
async function cargarEstadisticas() {
  try {
    const respuesta = await fetch(`${API_BASE_URL}/admin/estadisticas`, {
      method: 'GET',
      credentials: 'include' // Clave para que pase el middleware validarAdmin
    });

    if (!respuesta.ok) throw new Error('Error al traer las estadísticas');
    
    const datos = await respuesta.json();

    // 1. Pintar las tarjetas de métricas extra
    document.getElementById('metrica-recaudacion').textContent = `$${datos.extra.totalRecaudado.toLocaleString('es-AR')}`;
    document.getElementById('metrica-productos').textContent = datos.extra.cantidadProductos;

    // 2. Pintar la tabla de Productos más vendidos
    const tbodyProductos = document.getElementById('tbody-top-productos');
    tbodyProductos.innerHTML = '';
    if (datos.productosMasVendidos.length === 0) {
      tbodyProductos.innerHTML = `<tr><td colspan="2" style="text-align:center; padding:10px;">No hay ventas registradas aún.</td></tr>`;
    } else {
      datos.productosMasVendidos.forEach(prod => {
        // Solo mostramos los que tienen al menos 1 venta para que sea un TOP real
        if(prod.cantidad_vendida > 0) {
          tbodyProductos.innerHTML += `
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;">${prod.nombre}</td>
              <td style="padding: 10px; border: 1px solid #ddd; text-align: center; font-weight: bold;">${prod.cantidad_vendida}</td>
            </tr>
          `;
        }
      });
    }

    // 3. Pintar la tabla de Ventas más caras
    const tbodyVentas = document.getElementById('tbody-top-ventas');
    tbodyVentas.innerHTML = '';
    if (datos.ventasMasCaras.length === 0) {
      tbodyVentas.innerHTML = `<tr><td colspan="2" style="text-align:center; padding:10px;">No hay ventas registradas aún.</td></tr>`;
    } else {
      datos.ventasMasCaras.forEach(venta => {
        const fecha = new Date(venta.fecha).toLocaleDateString('es-AR');
        tbodyVentas.innerHTML += `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">${fecha}</td>
            <td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold; color: #1a5c32;">$${venta.total.toLocaleString('es-AR')}</td>
          </tr>
        `;
      });
    }

  } catch (error) {
    console.error("Falló la carga de estadísticas:", error);
  }
}

// ==========================================
// DESCARGAR EXCEL CON SHEETJS
// ==========================================
const btnExportarExcel = document.getElementById('btn-exportar-excel');

if (btnExportarExcel) {
  btnExportarExcel.addEventListener('click', () => {
    // 1. Creamos un libro de Excel virtual en blanco
    const libroExcel = XLSX.utils.book_new();

    // 2. Buscamos las tablas HTML subiendo un nivel desde el tbody (al elemento <table>)
    const tablaLogs = document.getElementById('tbody-logs').parentElement;
    const tablaProductos = document.getElementById('tbody-top-productos').parentElement;
    const tablaVentas = document.getElementById('tbody-top-ventas').parentElement;

    // 3. Convertimos esas tablas HTML en hojas de cálculo
    const hojaLogs = XLSX.utils.table_to_sheet(tablaLogs);
    const hojaProductos = XLSX.utils.table_to_sheet(tablaProductos);
    const hojaVentas = XLSX.utils.table_to_sheet(tablaVentas);

    // 4. Metemos las hojas adentro del libro de Excel con su respectivo nombre
    XLSX.utils.book_append_sheet(libroExcel, hojaLogs, "Accesos");
    XLSX.utils.book_append_sheet(libroExcel, hojaProductos, "Más Vendidos");
    XLSX.utils.book_append_sheet(libroExcel, hojaVentas, "Mejores Ventas");

    // 5. Forzamos la descarga del archivo al disco duro
    XLSX.writeFile(libroExcel, "Reporte_Estadisticas_PetShop.xlsx");
  });
}