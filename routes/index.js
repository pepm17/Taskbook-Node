'use strict'

const express = require('express')
const api = express.Router();
const auth = require('../middlewares/auth')
const teamCtrl = require('../controllers/TeamCtrl');

//rutas

api.get('/team', teamCtrl.getTeams);
api.get('/team/:teamId', teamCtrl.getTeam);
api.get('/private', auth.isAuth, (req, res)=>{
    res.status(200).send({ message: 'Tienes acceso'})
})

module.exports = api;