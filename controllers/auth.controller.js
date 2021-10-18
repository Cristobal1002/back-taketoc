const { response } = require("express");
const bcryptjs = require('bcryptjs');

//const Usuario = require('../models/user.model');
const { Usuario } = require('../models')
const { jwtGenerator } = require("../services/jwt-generator.service");


const login = async(req, res = response) => {

    const  {user_email, password} = req.body

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({user_email});
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario o contraseña incorrectos - email"
            })
        }
        // Verificar estado del usuario

        if (!usuario.status) {
            return res.status(400).json({
                msg: "Usuario no autorizado - Estatus"
            })
        }

        //Verificar contraseña

        const passValidate = bcryptjs.compareSync(password, usuario.password);
        if (!passValidate) {
            return res.status(400).json({
                msg: "Usuario o contraseña incorrectos - Password"
            })
        }


        //Generar el JWT

        const token = await jwtGenerator(usuario.id, usuario.business);

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Algo salió mal y es algo que no debería suceder jamás"
        })
    }


}

module.exports = {
    login
}