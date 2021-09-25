const Store = require('../models/store.model')
const User = require('../models/user.model')
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

const valUserByEmail = async (user_email) => {
    const user = await User.findOne({ user_email });
    if (user) {
        throw new Error(`El correo: ${user_email} ya se encuentra registrado`)
    }
}
module.exports = {
    valTiendaByEmail,
    valTiendaById,
    valUserByEmail
}