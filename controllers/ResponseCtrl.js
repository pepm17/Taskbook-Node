'use strict'

const Response = require('../models/Response')

function postResponse(req, res){
	var response = new Response()
	response.content = req.body.content
	response._dad = req.params.activityid
	response.user = req.userid
	response.save(response, (err, responseStored)=>{
		if(err) return res.status(500).send({message: `error al enviar comentario ${err}`})
        res.status(200).send({message: 'Se ha enviado el mensaje con exito'})
	})
}

function getResponse(req, res){
	Response.findById(req.params.responseid, (err, responses)=>{
		if(err) return res.status(500).send({message: `error al buscar comentario ${err}`})
		if(!responses) return res.status(404).send({message: 'No hay comentario'})
        res.status(200).send({responses})
	})
}

function getResponses(req, res){
	Response.find({}, (err, responses)=>{
		if(err) return res.status(500).send({message: `error al buscar comentario ${err}`})
		if(!responses) return res.status(404).send({message: 'No hay comentario'})
        res.status(200).send({responses})
	})
}

function getResponsesActivity(req, res){
	Response.find({_dad: req.params.activityid}, (err, responses)=>{
		if(err) return res.status(500).send({message: `error al buscar comentario ${err}`})
		if(!responses) return res.status(404).send({message: 'No hay comentario'})
        res.status(200).send({responses})
	})
}

function updateResponse(req, res){
	Response.findById(req.params.responseId, (err, response)=>{
		if(err) return res.status(500).send({message: `error al buscar comentario ${err}`})
		if(!response) return res.status(404).send({message: 'No existe el comentario'})	
		response.content = req.body.content
		response.save(response, (err, responseStored)=>{
			if(err) res.status(500).send({message: `error al buscar comentario ${err}`})
			res.status(200).send({message: 'Se ha actualizado el mensaje con exito'})
		})
	})
}

function deleteResponse(req, res){
	Response.findByIdAndDelete(req.params.responseId, (err, response)=>{
		if(err) return res.status(500).send({message: `se produjo un error en la operacion ${err}`})
        if(!team) return res.status(404).send({message: 'El comentario no existe'})
        res.status(200).send({message: 'se ha eliminado con exito el comentario'})
	})
}

module.exports = {
	postResponse,
	getResponse,
	getResponses,
	getResponsesActivity,
    updateResponse,
    deleteResponse
}