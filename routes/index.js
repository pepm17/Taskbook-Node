'use strict'

const express = require('express')
const api = express.Router();
const auth = require('../middlewares/auth')
const teamCtrl = require('../controllers/TeamCtrl');
const authCtrl = require('../controllers/auth');
const userCtrl = require('../controllers/UserCtrl');
//rutas

api.get('/teams', teamCtrl.getTeams);
api.get('/teams/:teamid', teamCtrl.getTeam);
api.post('/teams', teamCtrl.postTeam);
api.put('/teams/:teamid', teamCtrl.updateTeam);
api.delete('/teams/:teamid', teamCtrl.deleteTeam);

api.get('/users', auth, userCtrl.getUsers);
api.get('/users/:userid', userCtrl.getUser);
api.delete('/users/:userid', userCtrl.deleteUser);
api.get('/private', auth, (req, res)=>{
    res.status(200).send({ message: 'Tienes acceso'})
})

api.post('/signup', authCtrl.signUp)
api.post('/signin', authCtrl.signIn)

module.exports = api;