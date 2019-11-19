var {sequelize,Sequelize} = require('../Database/connection')

const animals = sequelize.define("animals", {
    id_usuario:{
        type:Sequelize.INTEGER
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
    
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "animals",
    freezeTableName:true,
    schema: "public"
})
animals.sync({force:true})
module.exports = animals;