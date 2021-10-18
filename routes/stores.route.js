
const { Router } = require('express');
const { check } = require('express-validator');
const { createStore, updateStore, getStores } = require('../controllers/stores.controller');
const { valTiendaByEmail, valTiendaById } = require('../helpers/commons-validators');
const { jwtValidate } = require('../middlewares/jwt-validate');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
    check('business_name','El nombre de la tienda es obligatorio').notEmpty(),
    check('business_phone','El número de teléfono es obligatorio').notEmpty(),
    check('business_number','El número de identificación del negocio es obligatorio').notEmpty(),
    check('contact_email','El correo no es válido').isEmail(),
    check('contact_email').custom(valTiendaByEmail),
    validarCampos
], createStore);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(valTiendaById),
    validarCampos
], 
updateStore);

router.put('/', getStores)

module.exports = router