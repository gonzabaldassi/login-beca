const express = require('express');
const cors = require('cors'); //permite o restringe solicitudes HTTP desde diferentes dominios. Esto es útil para permitir que clientes de otras fuentes (como un front end en React) puedan hacer peticiones al servidor.
const app = express(); //Inicializa una aplicación de Express, que manejará las rutas, peticiones y respuestas del servidor.

const mongoose = require('mongoose');

require("dotenv").config(); //Carga el contenido de un archivo .env (archivo de entorno) donde puedes guardar variables sensibles como contraseñas, claves API o configuraciones. Aquí es utilizado para acceder a las variables de entorno.

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api-beca/signup', require('./routes/signup'));
app.use('/api-beca/signout', require('./routes/signout'));
app.use('/api-beca/login', require('./routes/login'));
app.use('/api-beca/user', require('./routes/user'));
app.use('/api-beca/todos', require('./routes/todos'));
app.use('/api-beca/refresh-token', require('./routes/refreshToken'));


app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
});