
const { Router } = require('express');
const { getUsers, createUser } = require('../controllers/users.controller');
const { valUserByEmail} = require('../helpers/commons-validators');
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");

const router = Router();

router.get('/', getUsers); //Aquí no estoy ejecutando la función getUsers sino haciendo una referencia a la misma por eso no lleva los ()

router.post('/',
    [
        check('hash','El hash es obligatorio').notEmpty(),
        check('password','La contraseña es obligatorio').notEmpty(),
        check('user_name','El nombre es obligatorio').notEmpty(),
        check('user_email','El correo no es válido').isEmail().custom(valUserByEmail),
    ],
    validarCampos,
    createUser)


module.exports = router;