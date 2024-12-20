const app = require('./app');
const Greenlock = require('greenlock-express');
const path = require('path');
require('dotenv').config({ path: '../.env' });


const PORT = process.env.PORT || 6767;

// Configurar Greenlock certificado SSL
const greenlock = Greenlock.init({
    packageRoot: path.join(__dirname, '../'), // Directorio raíz del paquete
    configDir: '../greenlock.d', // Carpeta donde se guardarán los certificados
    maintainerEmail: 'aristizabal.ocampo@gmail.com', // Tu correo para Let's Encrypt
    cluster: false, // Úsalo solo en producción si necesitas clúster
    staging: false // Cambia a false para producción
  });

// Iniciar servidor HTTPS con Greenlock
greenlock.serve(app);

// Escuchar en el puerto configurado
app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});