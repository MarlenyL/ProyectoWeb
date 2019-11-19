
var {sequelize,Sequelize}= require('../Database/connection')
var usuario = require('../models/usuario');

sequelize
    .authenticate()
    .then(async () => {
        console.log('Connection has been established successfully.');
        await usuario.findAll({ attributes: ['id', 'nombre', 'usuario', 'contrasea'] }).then(usuario => {
            console.log(JSON.stringify(usuario));
        })
        await sequelize.query(`SELECT now();`).then((data) => { console.log(data) })
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
