const mongoose = require('mongoose');


const dbConnect = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CONNECT, {

                useNewUrlParser: true,
                useUnifiedTopology: true,

            }); 

            console.log('Base de datos Conectada');

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar la base de datos');

    }
}

module.exports = {
    dbConnect
}