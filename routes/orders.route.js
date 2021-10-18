const { Router } = require('express');
const { check } = require('express-validator');

//Middlewares
const {
    jwtValidate,
} = require('../middlewares')


const { createOrder } = require('../controllers/orders.controller');



const router = Router();

// Crear pedido
router.post('/',[jwtValidate],
createOrder);

//Actualizar pedido Rol Store


//Actualizar pedido Rol Admin


//Borrar pedido


//Consultar pedidos por tienda


//Consultar pedidos global


module.exports = router