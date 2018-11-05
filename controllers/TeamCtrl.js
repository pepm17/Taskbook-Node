'use strict'

const Team = require('../models/Team')

function getTeam(req, res){
    Team.findById(req.params.TeamId, (err, team)=>{
        if(err) res.status(500).send({ message: `Se produjo un error al realizar la consulta: ${err}`})
        if(!team) res.status(404).send({ message: 'El equipo no existe'})
        res.status(200).send({team});
    });
}

function getTeams(req, res){
    Team.find({}, (err, teams)=>{
        if(err) res.status(500).send({message: `Se produjo un error al realizar la consulta ${err}`});
        if(!teams) res.status(404).send({message: 'No existen equipos'});
        res.status(200).send({teams});
    });
}

function postTeam(req, res){
    /*var team = new Team();
    team.name = req.body.name;
    team.description = req.body.description;
    team.creator = req.body.user_id;*/
}

module.exports = {
    getTeam,
    getTeams,
    postTeam
}