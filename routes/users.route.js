
const { Router } = require('express');
const { getUsers, createUser } = require('../controllers/users.controller');

const router = Router();

router.get('/', getUsers); //Aquí no estoy ejecutando la función getUsers sino haciendo una referencia a la misma por eso no lleva los ()

router.post('/', createUser)


module.exports = router;