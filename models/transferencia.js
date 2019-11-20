var {sequelize,Sequelize} = require('../Database/connection')

const transferencia = sequelize.define("transferencia", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    id_transferencia :{
        type: Sequelize.INTEGER
    },
    id_transaccion: {
        type: Sequelize.INTEGER
    },
    
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "transferencia",
    freezeTableName:true,
    schema: "public"
})
//animals.sync({force:true});
module.exports = transferencia;
