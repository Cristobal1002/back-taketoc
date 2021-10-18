const { response } = require("express");


const validarAdminRole = (req, res = response, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'falló la validación del token - Valide el jwt primero'
        })
    }

    const {rol, user_name} = req.usuario;

    if (rol !== 'admin') {
        return res.status(401).json({
            msg: `El usuario ${user_name} no tiene privilegios para ejecutar esta acción, rol: ${rol}`
        })
    }

    next();
}

module.exports = {
    validarAdminRole
}