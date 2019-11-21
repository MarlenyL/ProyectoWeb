
var {sequelize,Sequelize}= require('../Database/connection')
var usuario = require('../models/usuario');
var beneficiario = require('../models/beneficiario');
sequelize
    .authenticate()
    .then(async () => {
        console.log('Connection has been established successfully.');
        await usuario.findAll({ attributes: ['id', 'nombre', 'usuario', 'contrasea'] }).then(usuario => {
            console.log(JSON.stringify(usuario));
        })
        await sequelize.query(`SELECT now();`).then((data) => { console.log(data) })
    }) 
    .then(async () => {
        await beneficiario.findAll({ attributes: ['id', 'id_usuario', 'carnet', 'saldo'] }).then(beneficiario => {
        console.log(JSON.stringify(beneficiario));
        })
        await sequelize.query(`SELECT now();`).then((data) => { console.log(data) })
    })
//obtiene todos los usuarios
module.exports.getAll = function(){
    usuario.findAll({ attributes: ['id', 'nombre', 'usuario', 'contrasea'] })
    .then(usuario => {
        console.log(JSON.stringify(usuario)," ");
    })
}


