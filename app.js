'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
    });//permite que se hagan peticiones al servidor desde uno externo
app.use('/taskbook', api);

module.exports = app;