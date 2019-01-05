'use strict'

const Activity = require('../models/Activity')

function getActivity(req, res){
    Activity.findOne({team: req.params.teamid, _id: req.params.activityid}, (err, activity)=>{
        if(err) return res.status(500).send({message: `Ha ocurrido un error al realizar la consulta ${err}`})
        if(!activity) return res.status(404).send({message: 'No existen actividades'})
        res.status(200).send({activity})
    })
}

function geatAllActivities(req, res){
    Activity.find({})
}

function getActivities(req, res){
    Activity.find({team: req.params.teamid}, (err, activities)=>{
        if(err) return res.status(500).send({message: `Ha ocurrido un error al realizar la consulta ${err}`})
        if(!activities) return res.status(404).send({message: 'No existen actividades'})
        res.status(200).send({activities})
    })
}

function postActivity(req, res){
    var activity = new Activity()
    activity.title = req.body.title
    activity.description = req.body.description
    activity.team = req.params.teamid

    Activity.save(activity, (err, activityStored)=>{
        if(err) res.status(500).send({message: `Error al guarda la actividad ${err}`})
        res.status(200).send({message: 'se ha creado la actividad con exito'})
    })
}