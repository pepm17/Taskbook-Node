'use strict'

const Team = require('../models/Team')

function getTeam(req, res){
    Team.findById(req.params.teamid, (err, team)=>{
        if(!team) res.status(404).send({ message: 'El equipo no existe'})
        if(err) res.status(500).send({ message: `Se produjo un error al realizar la consulta: ${err}`})
        res.status(200).send({team});
    });
}

function getTeams(req, res){
    Team.find({}, (err, teams)=>{
        if(!teams) res.status(404).send({message: 'No existen equipos'})
        if(err) res.status(500).send({message: `Se produjo un error al realizar la consulta ${err}`})
        res.status(200).send({teams});
    });
}

function postTeam(req, res){
    var team = new Team()
    team.name = req.body.name
    team.description = req.body.description
    team.creator = req.body.userid
    team.save(team, (err, teamStored)=>{
        if(err) res.status(500).send({message: `error al crear el equipo ${err}`})
        res.status(200).send({message: 'se ha creado el equipo con exito'})
    })
}

function updateTeam(req, res){
    Team.findByIdAndUpdate(req.params.teamid, req.body, (err, teamUpdated)=>{
        if(!teamUpdated) res.status(404).send({message: 'no existe el equipo'})
        if(err) res.status(500).send({message: `se produjo un error en la operacion ${err}`})
        res.status(200).send({message: 'se realizó con exito la actualizacion'})
    })
}

function deleteTeam(req, res){
    Team.findByIdAndDelete(req.params.teamid, (err, team)=>{
        if(!team) res.status(404).send({message: 'el equipo a eliminar no existe'})
        if(err) res.status(500).send({message: `se produjo un error en la operacion ${err}`})
        res.status(200).send({message: 'se ha eliminado con exito el equipo'})
    })
}

module.exports = {
    getTeam,
    getTeams,
    postTeam,
    updateTeam,
    deleteTeam
}