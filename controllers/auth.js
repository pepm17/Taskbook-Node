'use strict'

const mongoose = require('mongoose')
const User = require('../models/User')
const service = require('../services')

function signUp(req, res){
    //if(!req.body.email||!req.body.displayName) res.status(500).send({message: 'Correo o nick requeridos'})
    
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName
        
    })
    user.save((err)=>{
        if(err) res.status(500).send({ message: `Error al crear el usuario: ${err}`})

        return res.status(200).send({ token: service.createToken(user)})
    })
}

function signIn(req, res){
    User.find({ email: req.body.email}, (err, user)=>{
        if(err) return res.status(500).send({ message: err})
        if(!user) return res.status(404).send({ message: 'No existe el usuario'})

        req.user = user
        res.status(200).send({
            message: 'Has logueado correctamente',
            token: service.createToken(user) //crea un token y lo envia por mensaje con el objetivo de poder verificarlo en la ruta privada
        })
    })
}

module.exports = {
    signUp,
    signIn
}