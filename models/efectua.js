var {sequelize,Sequelize} = require('../Database/connection')

const efectua = sequelize.define("efectua", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    id_transferencia :{
        type: Sequelize.INTEGER
    },
    id_beneficiario_donador: {
        type: Sequelize.INTEGER
    },
    id_beneficiario_receptor: {
        type: Sequelize.INTEGER
    },
    monto: {
        type: Sequelize.DECIMAL(10, 2)
    },
    
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "efectua",
    freezeTableName:true,
    schema: "public"
})
//animals.sync({force:true});
module.exports = efectua;
