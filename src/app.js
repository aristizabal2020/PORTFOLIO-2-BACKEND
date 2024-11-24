const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const allowedOrigins = ['https://aristizabal.dev'];

const userRoutes = require('./routes/userRoutes');
const discordRoutes = require('./routes/discordRoutes');

const app = express();

// solo permite solicitudes desde mi dominio
app.use(cors({
    origin: function(origin, callback) {
        // Si la solicitud proviene de localhost, se permite para pruebas
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No Autorizado'), false);
        }
    },
    methods: ['GET'],
}));

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());



// Rutas
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/discord', discordRoutes);
app.use('/profile', discordRoutes);




module.exports = app;
