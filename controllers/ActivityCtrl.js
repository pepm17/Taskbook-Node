'use strict'

const Activity = require('../models/Activity')
const Team = require('../models/Team')

function getActivity(req, res){
    Activity.findOne({_dad: req.params.teamid, _id: req.params.activityid}, (err, activity)=>{
        if(err) return res.status(500).send({message: `Ha ocurrido un error al realizar la consulta ${err}`})
        if(!activity) return res.status(404).send({message: 'No existen actividades'})
        res.status(200).send({activity})
    })
}

function getAllActivitiesUser(req, res){
    Team.find({users: req.userid}).populate('activities').populate('creator').exec((err, teams)=>{
        if(err) return res.status(500).send({message: `Ha ocurrido un error al realizar la consulta ${err}`})
        if(!teams) return res.status(404).send({message: 'No existen actividades'})
        res.status(200).send({teams})
    })
}

function getActivities(req, res){
    Activity.find({_dad: req.params.teamid}, (err, activities)=>{
        if(err) return res.status(500).send({message: `Ha ocurrido un error al realizar la consulta ${err}`})
        if(!activities) return res.status(404).send({message: 'No existen actividades'})
        res.status(200).send({activities})
    })
}

function postActivity(req, res){
    var activity = new Activity()
    activity.title = req.body.title
    activity.description = req.body.description
    activity._dad = req.params.teamid
    activity.save(activity, (err, activityStored)=>{
        if(err) return res.status(500).send({message: `Error al guarda la actividad ${err}`})
        Team.findById(req.params.teamid, (err, team)=>{
            if(err) return res.status(500).send({ message: `Se produjo un error al realizar la consulta: ${err}`})
            if(!team) return res.status(404).send({ message: 'El equipo no existe'})
            team.activities.push(activityStored.id)
            team.save((err, teamUpdate)=>{
                if(err) return res.status(500).send({message: `Error al actualizar el grupo ${err}`})
                res.status(200).send({message: 'se realizó con exito la actualizacion'})
            })
        })
    })    
}

function updateActivity(req, res){
    Activity.findById(req.params.activityId, (err, activity)=>{
        
    })
}

function deleteActivity(req, res){
    Activity.findByIdAndDelete(req.params.activityid, (err, activity)=>{
        if(err) return res.status(500).send({message: `se produjo un error en la operacion ${err}`})
        if(!activity) return res.status(404).send({message: 'la actividad a eliminar no existe'})
        res.status(200).send({message: 'se ha eliminado con exito la actividad'})
    })
}

module.exports = {
    getActivity,
    getAllActivitiesUser,
    getActivities,
    postActivity,
    deleteActivity
}