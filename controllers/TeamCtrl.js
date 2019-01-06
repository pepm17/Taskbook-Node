'use strict'

const Team = require('../models/Team')

function getTeam(req, res){
    Team.findById(req.params.teamid).populate('users').populate('creator').populate('activities').exec((err, team)=>{
        if(err) return res.status(500).send({ message: `Se produjo un error al realizar la consulta: ${err}`})
        if(!team) return res.status(404).send({ message: 'El equipo no existe'})
        res.status(200).send({team});
    });
}

function getTeams(req, res){
    Team.find({}).populate('users').populate('creator').populate('activities').exec((err, teams)=>{
        if(err) return res.status(500).send({message: `Se produjo un error al realizar la consulta ${err}`})
        if(!teams) return res.status(404).send({message: 'No existen equipos'})
        res.status(200).send({teams});
    });
}

//tengo que obtener todos mis equipos
function getMyTeams(req, res){
    Team.find({users: req.userid}, (err, teams)=>{
        if(err) return res.status(500).send({message: `Ha ocurrido un error al realizar la consulta ${err}`})
        if(!teams) return res.status(404).send({message: 'No existen equipos'})
        res.status(200).send({teams})
    })
}

function postTeam(req, res){
    var team = new Team()
    team.name = req.body.name
    team.description = req.body.description
    team.creator = req.userid,
    team.users.push(req.userid),
    team.save(team, (err, teamStored)=>{
        if(err) res.status(500).send({message: `error al crear el equipo ${err}`})
        res.status(200).send({message: 'se ha creado el equipo con exito', team: teamStored})
    })
}

/*function updateTeam(req, res){
    Team.findByIdAndUpdate(req.params.teamid, req.body, (err, teamUpdated)=>{
        if(err) return res.status(500).send({message: `se produjo un error en la operacion ${err}`})
        if(!teamUpdated) return res.status(404).send({message: 'no existe el equipo'})
        res.status(200).send({message: 'se realizó con exito la actualizacion'})
    })
}*/

function updateTeam(req, res){
    Team.findById(req.params.teamid, (err, teamFound)=>{
        if(err) return res.status(500).send({message: `se produjo un error en la operacion ${err}`})
        if(!teamFound) return res.status(404).send({message: 'no existe el equipo'})
        if(req.body.name) teamFound.name = req.body.name;
        if(req.body.description) teamFound.description = req.body.description;
        //if(req.body.creator) teamFound.creator = req.body.creator; No creo que se pueda modificar esto, pero por si acaso
        if(req.body.users) teamFound.users.push(req.users);
        if(req.body.activities) teamFound.activities.push(req.body.activities);
        teamFound.save((err, teamUpdated)=>{
            if(err) return res.status(500).send({message: `se produjo un error en la operacion de actualizacion ${err}`})
            res.status(200).send({message: 'se realizó con exito la actualizacion'})
        })
    })
}

function deleteTeam(req, res){
    Team.findByIdAndDelete(req.params.teamid, (err, team)=>{
        if(err) return res.status(500).send({message: `se produjo un error en la operacion ${err}`})
        if(!team) return res.status(404).send({message: 'el equipo a eliminar no existe'})
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