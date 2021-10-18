
const jwtValidate = require('../middlewares/jwt-validate');
const validarAdminRole = require('../middlewares/role.validate');
const validarCampos = require("../middlewares/validar-campos");

module.exports = {
    ...jwtValidate,
    ...validarAdminRole,
    ...validarCampos
}