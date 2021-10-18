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
        required: [true, 'El correo electrónico del usuario es obligatorio']
    },
    rol: {
        type: String,
        required: [true, 'El rol del usuario es obligatorio'],
        enum: ['admin', 'store']
    },
    user_phone: {
        type: Number,
        required: [true, 'el # de clular es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio']
    },
    status: {
        type: Boolean,
        required: [true, 'El rol del usuario es obligatorio'],
    }

})

userSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.uid = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password
        return ret;
    }
};

module.exports = model('Usuario', userSchema)