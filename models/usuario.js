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
<<<<<<< HEAD
    
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "usuarios",
    freezeTableName:true,
    schema: "public"
=======
    /*timestamps: false,
    createdAt:false,
    updatedAt: false*/
>>>>>>> 18d69b19bb943b9944d8c60b5a7fc8d743133740
})
//animals.sync({force:true});
module.exports = usuarios;
