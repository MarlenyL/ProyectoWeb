
var {sequelize,Sequelize}= require('../Database/connection')
var usuario = require('../models/usuario');

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        usuario.findAll({ raw: true }).then(usuario => {
            console.dir(usuario);
        })
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
