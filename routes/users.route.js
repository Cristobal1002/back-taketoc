
const { Router } = require('express');
const { check } = require("express-validator");

//Middlewares
const {
    jwtValidate,
    validarAdminRole,
    validarCampos
} = require('../middlewares')


const { getUsers, createUser, deleteUser } = require('../controllers/users.controller');
const { valUserByEmail, valUserById } = require('../helpers/commons-validators');


const router = Router();

router.get('/', getUsers); //Aquí no estoy ejecutando la función getUsers sino haciendo una referencia a la misma por eso no lleva los ()

router.post('/',
    [
        check('hash', 'El hash es obligatorio').notEmpty(),
        check('password', 'La contraseña es obligatorio').notEmpty(),
        check('user_name', 'El nombre es obligatorio').notEmpty(),
        check('user_phone', 'El telefono del usuario es obligatorio'),
        check('user_email', 'El correo no es válido').isEmail().custom(valUserByEmail),
        validarCampos
    ],
    createUser);

router.delete('/:id',
    jwtValidate,
    validarAdminRole,
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(valUserById),
        validarCampos,
    ],

    deleteUser);

module.exports = router;