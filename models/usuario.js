var {sequelize,Sequelize} = require('../Database/connection')

const usuarios = sequelize.define("usuarios", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    nombre :{
        type: Sequelize.STRING
    },
    usuario: {
        type: Sequelize.STRING
    },
    contrasea: {
        type: Sequelize.STRING
    },
    foto: {
        type: Sequelize.STRING
    }
    
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "usuarios",
    freezeTableName:true,
    schema: "public"
})
//usuarios.sync({force: true});
module.exports = usuarios;
