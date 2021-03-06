const express = require('express');
const cors = require('cors');
const { dbConnect } = require('../database/db.config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Conexión a Base de Datos

        this.conectarDB();

        //Paths
        this.usersPath = '/api/user'
        this.storePath = '/api/store'
        this.authPath = '/api/auth'
        this.orderPath = '/api/order'

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnect();
    }


    middlewares(){

        //CORS
        this.app.use(cors());

        //Lectura y Parse del Json
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));//Public es la Carpeta que estoy publicando
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.route'));
        this.app.use(this.usersPath, require('../routes/users.route'));
        this.app.use(this.storePath, require('../routes/stores.route'));
        this.app.use(this.orderPath, require('../routes/orders.route'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }

}

module.exports = Server;