const sequelize = require('./config/database');
const Producto = require('./src/models/producto'); // Importamos el modelo recién creado

const rutasApi = require('./src/api/producto');
app.use('/api', rutasApi); // Todas tus rutas van a empezar con /api/...

// Sincronizamos la base de datos
sequelize.sync({ alter: true }) // alter: true actualiza la tabla si le hacés cambios al modelo después
  .then(() => {
    console.log('¡Base de datos y tablas sincronizadas con éxito! 🚀');
  })
  .catch(err => {
    console.error('Error al sincronizar:', err);
  });


  // Permite que Express entienda los paquetes con formato JSON que envíe el Frontend
app.use(express.json());

// Permite procesar los datos que vienen de formularios comunes (urlencoded)
app.use(express.urlencoded({ extended: true }));