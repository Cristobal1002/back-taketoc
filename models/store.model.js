const { Schema, model } = require('mongoose');

const storeSchema = Schema({

    business_name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    business_number:{
        type: String,
        required: [true, 'El número de documento de la empresa es obligatorio']
    },
    contact_email: {
        type: String,
        required: [true, 'El correo de contacto es obligatorio']
    },
    business_phone: {
        type: String,
        required: [true, 'El numero de telefono es obligatorio']
    },
    business_address: {
        type: String,
        required: [true, 'La dirección de la tienda es obligatoria']
    },
    business_state: {
        type: Boolean,
        default: true
    }

})

module.exports = model('Tienda', storeSchema)