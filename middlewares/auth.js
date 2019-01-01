'use strict'

const service = require('../services')

function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorizacion'})
    }

    const bearer = req.headers.authorization.split(' ')
    const token = bearer[1]
    service.decodeToken(token)
    .then(response =>{
        req.userid = response
        next()
    })
    .catch(response =>{
        res.status(response.status).send({message: response.message})
    })
}

module.exports = isAuth