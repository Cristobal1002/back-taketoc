const { response } = require('express');
const sendEmail = require('../services/send-email.service');
const Store = require('../models/store.model');
const {EncryptService} = require('../services/encrypt.service')

const USER_CREATION_URL ='http://localhost:4200/#/register/'

const createStore = async (req, res = response) => {

    const { business_name, contact_email, business_number, business_phone, business_city, business_address, business_state } = req.body;
    const store = new Store({ business_name, contact_email, business_number, business_phone, business_city, business_address, business_state });

    //Guarda en la base de datos
    await store.save( async (  err) => {

        if (err) {
            res.json({
                msg: 'Error al registrar la tienda',
                err
            })
        } else {
            res.json({
                msg: 'Registro Éxitoso',
                store
            });
            console.log('sending email to -->', store.id)

            // crear el link de invitación
            const es = new EncryptService()
            const register_link = USER_CREATION_URL + await  es.encryptEAS(store.id)
            // console.log(register_link)
            sendEmail(contact_email, register_link);
            // await store.remove()
        }

    });

}


// Editar Tienda
const updateStore = async (req, res = response) => {

    const { id } = req.params
    const { _id, ...datos } = req.body //Aqui uso los ...datos para mandar a actualizar todos los datos

    //Actualizar la info enviada
    const store = await Store.findByIdAndUpdate(id, datos);

    res.json({
        msg: 'PUT - API Controller',
        id,

        //TODO
        // Enviar invitación de registro si se actualiza el correo electronico

    });

}

//Obtener Tiendas

const getStores = async (req = request, res = response) => {

    const { limite = 10, desde = 0 } = req.query;
    const filtro = { business_state: true };

    const [totalStores, stores] = await Promise.all([
        Store.countDocuments(filtro),
        Store.find(filtro)
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    res.json({
        totalStores,
        stores
    });

}

// Eliminar Tienda



module.exports = {
    createStore,
    updateStore,
    getStores
}