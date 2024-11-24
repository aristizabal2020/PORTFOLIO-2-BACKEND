const app = require('./app');
const Greenlock = require('greenlock-express');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 6767;

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// Configurar Greenlock certificado SSL
// const greenlock = Greenlock.init({
//     packageRoot: path.join(__dirname, '../'), // Directorio raíz del paquete
//     configDir: './greenlock.d', // Carpeta donde se guardarán los certificados
//     maintainerEmail: 'aristizabal.ocampo@gmail.com', // Tu correo para Let's Encrypt
//     cluster: false, // Úsalo solo en producción si necesitas clúster
//     staging: false // Cambia a false para producción
//   });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

// Iniciar servidor HTTPS con Greenlock
// greenlock.serve(app);
