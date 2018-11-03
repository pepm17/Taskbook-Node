'use strict'


// se va a cargar el modulo de mongoose para hacer la conexion a la base de datos mongodb
const mongoose = require('mongoose');
// se va a cargar el servidor nodejs del fichero app.js configurado con Express
const app = require('./app');
// importar configuracion
const config = require('./config');

mongoose.Promise = global.Promise;

mongoose.connect(config.db, (err, res)=>{
    if(err){
        console.log(`error al conectar la base de datos ${err}`);
    }else{
        console.log('Conexion a la base de datos establecida...');
        app.listen(config.port, ()=>{
            console.log(`El servidor esta corriendo en http//:127.0.0.1:${config.port}`);
        });
    }
});
