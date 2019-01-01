'use strict'

const User = require('../models/User')

function getUsers(req, res){
    User.find({}, (err, users)=>{
        if(err) res.status(500).send({message: `se produjo un error al realizar la consulta ${err}`});
        if(!users) res.status(404).send({message: 'No existen usuarios'});
        res.status(200).send(users);
    });
}

function getUser(req, res){
    User.findById(req.params.userid, (err, user)=>{
        if(err) res.status(500).send({message: `se produjo un error al realizar la consulta ${err}`});
        if(!User) res.status(404).send({message: 'no existe el usuario'});
        res.status(200).send(user);
    })
}

function deleteUser(req, res){
    User.findByIdAndDelete(req.params.userid, (err, user)=>{
        if(err) res.status(500).send({message: `se ha producido un error al realizar la consulta ${err}`});
        if(!user) res.status(404).send({message: 'el usuario ingresado no existe'});
        res.status(200).send({message: 'usuario eliminado'})
    })
}

module.exports = {
    getUsers,
    getUser,
    deleteUser
}