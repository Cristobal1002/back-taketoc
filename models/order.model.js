 const { Schema, model} = require('mongoose');
 const mongoose = require('mongoose');
 const AutoIncrement = require('mongoose-sequence')(mongoose);
 


 const orderSchema = Schema({

    business: {
        type: Schema.Types.ObjectId,
        ref: 'Tienda',
        required: true
    },
    user_creator: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        //required: true
    },
    user_modifier: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        //required: true
    },
    create_date: {
        type: Date
    },
    mod_date: {
        type: Date
    },
    order_type: {
        type: String,
        required: true,
        enum: ['Entrega','Entrega y Recogida','Recogida']
    },
    order_category: {
        type: String,
        required: true,
        enum: ['Same Day', 'Next Day', 'Other Day']
    },
    date_delivery:{
        type: String,
        required: [true, 'La fecha de entrega es obligatoria']
    },
    pickup_remarks: {
        type: String
    },
    customer_name: {
        type: String,
        required: [true, 'El nombre del cliente es obligatorio']
    },
    delivery_city: {
        type: String,
        required: [true, 'La ciudad de entrega es obligatoria']
    },
    customer_address: {
        type: String,
        required:  [true, 'La dirección del cliente es obligatoria']
    },
    customer_phone: {
        type: String,
        required:  [true, 'El teléfono del cliente es obligatorio']
    },
    have_payment: {
        type: Boolean
    },
    payment_amount: {
        type: Number
    },
    order_status: {
        type: String,
        required:  [true, 'El estatus es obligatorio'],
        enum: ['En Bodega','En Ruta', 'Entregado', 'Cancelado', 'Pendiente']
    },
    order_detail: {
        type: Array,
        required: [true, 'El detalle del pedido es obligatorio']
    },
    pending_marks: {
        type: String,
    }

    

 })

 orderSchema.options.toJSON = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
    }
};

 orderSchema.plugin(AutoIncrement, {inc_field: 'order_number'})
 module.exports = model('Order', orderSchema)