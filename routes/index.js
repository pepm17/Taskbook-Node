'use strict'

const express = require('express');
const api = express.Router();
const auth = require('../middlewares/auth');
const teamCtrl = require('../controllers/TeamCtrl');
const authCtrl = require('../controllers/auth');
const userCtrl = require('../controllers/UserCtrl');
const actiCtrl = require('../controllers/ActivityCtrl');
const respCtrl = require('../controllers/ResponseCtrl');
//rutas
//api.get('/', (req, res)=>{
  //  res.status(200).send({message: 'hola mundo'})
//})

//crud teams
api.get('/teams', teamCtrl.getTeams);
api.get('/teams/:teamid', teamCtrl.getTeam);
api.post('/teams', auth, teamCtrl.postTeam);
api.put('/teams/:teamid', teamCtrl.updateTeam);
api.delete('/teams/:teamid', teamCtrl.deleteTeam);

//crud activities
api.get('/teams/:teamid/activities', actiCtrl.getActivities);
api.get('/teams/:teamid/activities/:activityid', actiCtrl.getActivity);
api.get('/', auth, actiCtrl.getAllActivitiesUser);
api.post('/teams/:teamid/activities', actiCtrl.postActivity);
api.put('/teams/:teamid/activities', actiCtrl.updateActivity);
api.delete('/activities/:activityid', actiCtrl.deleteActivity);

//crud response
api.get('/', auth, resp.getResponse);
api.post('/', auth, resp.postResponse);
api.put('/', resp.updateResponse);
api.delete('/', resp.deleteResponse);

//crud users
api.get('/users', auth, userCtrl.getUsers);
api.get('/users/:userid', auth, userCtrl.getUser);
api.delete('/users/:userid', userCtrl.deleteUser);
api.get('/private', auth, (req, res)=>{
    res.status(200).send({ message: 'Tienes acceso'})
})

api.post('/signup', authCtrl.signUp)
api.post('/signin', authCtrl.signIn)

module.exports = api;