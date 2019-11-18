var {sequelize,Sequelize} = require('../Database/connection')

const usuario = sequelize.define("usuario", {
    id_usuario:{
        type:Sequelize.NUMBER
    },
    nombre :{
        type: Sequelize.STRING
    },
    usuario: {
        type: Sequelize.STRING
    },
    contrasea: {
        type: Sequelize.STRING
    }
})

module.exports = usuario;
