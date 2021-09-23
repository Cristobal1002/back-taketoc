
const { response } = require('express');

const getUsers = (req, res = response) => {
    res.json({
        msg: "Get API - Controller"
    })
}

const createUser = (req, res = response) => {

    body = req.body;

    res.json({
        msg: "Post API - Controller",
        body
    })
}

module.exports = {
    getUsers,
    createUser
}