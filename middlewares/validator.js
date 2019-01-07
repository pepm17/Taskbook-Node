'use strict'

const Team = require('../models/Team')

function isCreatorTeam(req, res, next){
    Team.findById(req.params.teamid, (err, team)=>{
        if(err) return res.status(500).send({ message: `Se produjo un error al realizar la consulta: ${err}`})
        if(!team) return res.status(404).send({ message: 'El equipo no existe'})
        if(req.userid != team.creator) return res.status(500).send({message: 'No tienes permitido esa accion'})
        req.iscreator = true
        //console.log(req.userid)
        //console.log(team.creator)
        next()
    })
}
module.exports = isCreatorTeam