'use strict'

const Activity = require('../models/Activity')

function getActivity(req, res){
    Activity.find({team: req.params.teamid, _id: req.params.activityid}, (err, activity)=>{
        if(err) res.status(500).send({message: `Ha ocurrido un error al realizar la consulta ${err}`})
        if(!activity) res.status(404).send({message: 'No existen actividades'})
        res.status(200).send({activity})
    })
}

function getActivities(req, res){
    Activity.find({team: req.params.teamid}, (err, activities)=>{
        if(err) res.status(500).send({message: `Ha ocurrido un error al realizar la consulta ${err}`})
        if(!activities) res.status(404).send({message: 'No existen actividades'})
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