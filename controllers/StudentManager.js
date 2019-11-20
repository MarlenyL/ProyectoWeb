
var {sequelize,Sequelize}= require('../Database/connection')
var usuario = require('../models/usuario');
//obtiene todos los usuarios
module.exports.getAll = function(){
    usuario.findAll({ attributes: ['id', 'nombre', 'usuario', 'contrasea'] })
    .then(usuario => {
        console.log(JSON.stringify(usuario)," ");
    })
}


