
const { response, request } = require('express');
const Store = require("../models/store.model");
const User = require('../models/user.model')
const {EncryptService} = require('../services/encrypt.service')


const getUsers = (req, res = response) => {
    res.json({
        msg: "Get API - Controller"
    })
}

const createUser = async (req, res ) => {
    let { user_email, user_name, password, user_phone, hash } = req.body;
    const es = new EncryptService()
    let store

    try{
        const storeId = await es.decryptEAS(hash)
        store = await Store.findById(storeId)
    }catch (err){
        res.json({
            msg: 'El dato ingresado no es valido ',
            err
        })
    }

    password = await es.hashPassword(password)
    // el rol se puede poner en una constante
    const user = new User({user_email, user_name, password, user_phone, business: store, rol:'store', status:true });

    await user.save( async (  err) => {
        if (err) {
            res.json({
                msg: 'Error al registrar el usuario',
                err
            })
        }else {
            res.json({
                msg: "Usuario creado",
                body:user
            })
        }
    })

}

const deleteUser = async(req, res = response) =>{

    const { id } = req.params;
    const usuario = await User.findByIdAndUpdate(id, {status: false});


    res.json(usuario)

}

module.exports = {
    getUsers,
    createUser,
    deleteUser
}