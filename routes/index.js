'use strict'

const express = require('express')
const api = express.Router();
const auth = require('../middlewares/auth')
const teamCtrl = require('../controllers/TeamCtrl');
const userCtrl = require('../controllers/auth')
//rutas

api.get('/team', teamCtrl.getTeams);
api.get('/team/:teamId', teamCtrl.getTeam);
api.get('/private', auth, (req, res)=>{
    res.status(200).send({ message: 'Tienes acceso'})
})
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

module.exports = api;