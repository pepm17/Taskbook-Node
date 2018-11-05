'use strict'

const express = require('express')
const api = express.Router();
const teamCtrl = require('../controllers/TeamCtrl');

//rutas

api.get('/team', teamCtrl.getTeams);
api.get('/team/:teamId', teamCtrl.getTeam);

module.exports = api;