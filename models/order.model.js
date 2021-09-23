 const { Schema, model} = require('mongoose')
 


 const orderSchema = Schema({

    order_number: {//***Como se hace esto? */
        
    },
    business: {
        type: Schema.Type.ObjectId,
        ref: 'Tienda',
        required: true
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
    customer_addres: {
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
    pending_marks: {
        type: String,
    }

    

 })

 module.exports = model('Order', orderSchema)