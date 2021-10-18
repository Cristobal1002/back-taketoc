const { response, request } = require('express');
const jwt = require('jsonwebtoken');

//const Usuario = require('../models/user.model')
const { Usuario } = require('../models')


const jwtValidate = async(req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
        
    }

    try {

        const {uid} = jwt.verify( token, process.env.ENCRYPTION_KEY );

        //Leer la data de los modelos
        const usuario = await Usuario.findById(uid);
        

        //Valida que el usuario existe
        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no existe'
            })
        }

        //Verificacion estatus usuario
        if (!usuario.status) {
            return res.status(401).json({
                msg: 'Acceso restringido'
            })
        }
        
        
        req.usuario = usuario;
        next();
        
    } catch (error) {
     
        console.log(error);
        res.status(401).json({
            msg: 'El token no es válido'
        })
    }



}

module.exports = {
    jwtValidate
}