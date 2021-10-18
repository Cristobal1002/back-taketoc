const { response } = require('express');

const { Order } = require('../models');


const createOrder = async (req, res = response) => {

    //Petición que me llega del body
    const {
        order_type,
        order_category,
        date_delivery,
        customer_name,
        delivery_city,
        customer_address,
        customer_phone,
        have_payment,
        order_status,
        order_detail } = req.body

    //Armar información
    const order = new Order({
        business: req.usuario.business,
        user_creator: req.usuario._id,
        order_type,
        order_category,
        date_delivery,
        customer_name,
        delivery_city,
        customer_address,
        customer_phone,
        have_payment,
        order_status,
        order_detail
    });

    await order.save((err) => {
        if (err) {
            res.json({
                msg: 'Error al guardar el pedido',
                err
            })
        }else{
            res.json({
                msg: 'Registro Éxitoso',
                order
            })
        }
    })

}

//

module.exports = {
    createOrder
}
