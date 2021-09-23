require('dotenv').config();

const Server = require('./models/server');

const server = new Server(); //Esta es la instancia del server

server.listen(); //Aquí se lanza el metodo listen de la clase server para inicializar el server




