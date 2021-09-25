
const { response } = require('express');
const Store = require("../models/store.model");
const User = require('../models/user.model')
const {EncryptService} = require('../services/encrypt.service')


const getUsers = (req, res = response) => {
    res.json({
        msg: "Get API - Controller"
    })
}

const createUser = async (req, res ) => {
    let { user_email, user_name, password, hash } = req.body;
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
    const user = new User({user_email, user_name, password,business: store, rol:'admin' });

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

module.exports = {
    getUsers,
    createUser
}