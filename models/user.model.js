const { Schema, model} = require('mongoose');

const userSchema = Schema({

    business:{
        type: Schema.Types.ObjectId,
        ref: 'Tienda',
        required: true
    },
    user_name: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    user_email: {
        type: String,
        required: [true, 'El correo electronico del usuario es obligatorio']
    },
    rol: {
        type: String,
        required: [true, 'El rol del usuario es obligatorio'],
        enum: ['admin', 'store']
    }

})

module.exports = model('Usuario', userSchema)