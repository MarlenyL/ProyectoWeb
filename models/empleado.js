var {sequelize,Sequelize} = require('../Database/connection')

const empleado = sequelize.define("empleado", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    id_usuario:{
        type:Sequelize.INTEGER
    },
    telefono :{
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

module.exports = empleado;