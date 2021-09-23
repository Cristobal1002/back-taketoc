const Store = require('../models/store.model')

const valTiendaByEmail = async (contact_email) => {

    const validarTienda = await Store.findOne({ contact_email });
    if (validarTienda) {
        throw new Error(`El correo: ${contact_email} ya se encuentra registrado`)
    }

}

const valTiendaById = async (id) => {

    const validarTienda = await Store.findById(id);
    if (!validarTienda) {
        throw new Error(`El Id: ${id} no existe en la base de datos`)
    }

}

module.exports = {
    valTiendaByEmail,
    valTiendaById
}