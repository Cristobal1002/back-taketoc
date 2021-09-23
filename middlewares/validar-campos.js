const { validationResult } = require("express-validator");


const validarCampos = (req, res, next) =>{ //Como es un middleware se necesita un argumento adicional que se llam next
    //next es lo que tengo que llamar si el middleware pasa

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    next();

}

module.exports = {
    validarCampos
}