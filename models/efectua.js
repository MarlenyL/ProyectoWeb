var {sequelize,Sequelize} = require('../Database/connection')
var transferencia = require('../models/transferencia');
var beneficiario = require('../models/beneficiario');

const efectua = sequelize.define("efectua", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    id_transferencia :{
        type: Sequelize.INTEGER,
        references: transferencia,
        referenceKey: 'id',
    },
    id_beneficiario_donador: {
        type: Sequelize.INTEGER,
        references: beneficiario,
        referenceKey: 'id',
    },
    id_beneficiario_receptor: {
        type: Sequelize.INTEGER,
        references: beneficiario,
        referenceKey: 'id',
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
transferencia.hasOne(efectua);
beneficiario.hasOne(efectua);

module.exports = efectua;
