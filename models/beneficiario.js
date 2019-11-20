var {sequelize,Sequelize} = require('../Database/connection')

const beneficiario = sequelize.define("beneficiario", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    id_usuario:{
        type:Sequelize.INTEGER
    },
    carnet:{
        type: Sequelize.STRING
    },
    saldo: {
        type: Sequelize.DECIMAL(10, 2)  
    },
    
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "beneficiario",
    freezeTableName:true,
    schema: "public"
})
animals.sync({force:true})
module.exports = beneficiario;