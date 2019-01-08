'use strict'

const Team = require('../models/Team')
const Activity = require('../models/Activity')
const Response = require('../models/Response')

function isCreatorTeam(req, res, next){
    Team.findById(req.params.teamid, (err, team)=>{
        if(err) return res.status(500).send({ message: `Se produjo un error al realizar la consulta: ${err}`})
        if(!team) return res.status(404).send({ message: 'El equipo no existe'})
        if(req.userid != team.creator) return res.status(500).send({message: 'No tienes permitido esa accion'})
        req.iscreatorTeam = true
        //console.log(req.userid)
        //console.log(team.creator)
        next()
    })
}

function isCreatorActivity(req, res, next){
    Activity.findById(req.params.activityid, (err, activity)=>{
        if(err) return res.status(500).send({ message: `Se produjo un error al realizar la consulta: ${err}`})
        if(!activity) return res.status(404).send({ message: 'La actividad no existe'})
        if(req.userid != activity.creator) return res.status(500).send({message: 'No tienes permitido esa accion'})
        req.iscreatorActivity = true
        //console.log(req.userid)
        //console.log(team.creator)
        next()
    })
}

function isCreatorResponse(req, res, next){
    Response.findById(req.params.responseid, (err, response)=>{
        if(err) return res.status(500).send({ message: `Se produjo un error al realizar la consulta: ${err}`})
        if(!response) return res.status(404).send({ message: 'El comentario no existe'})
        if(req.userid != response.user) return res.status(500).send({message: 'No tienes permitido esa accion'})
        req.iscreatorResponse = true
        //console.log(req.userid)
        //console.log(team.creator)
        next()
    })
}

function isMemberTeam(req, res, next){
    Team.findById(req.params.teamid, (err, team)=>{
        if(err) return res.status(500).send({ message: `Se produjo un error al realizar la consulta: ${err}`})
        if(!team) return res.status(404).send({ message: 'El equipo no existe'})
        if(req.userid != team.creator) return res.status(500).send({message: 'No tienes permitido esa accion'})
        var result = false
        team.users.forEach(element => {
            if(element == req.userid){
                result = true
            }
        });
        if(result == false){
            res.status(500).send({message: 'No eres miembro del equipo'})
        }
        next()//funciona si el next() esta al final, si es la ultima condicion. INVESTIGAR!!!!
        //console.log(req.userid)
        //console.log(team.creator)
    })
}


module.exports = {
    isCreatorTeam,
    isCreatorActivity,
    isCreatorResponse,
    isMemberTeam
}