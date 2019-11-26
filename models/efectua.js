var {sequelize,Sequelize} = require('../Database/connection')
var transferencia = require('../models/transferencia');
var beneficiario = require('../models/beneficiario');

const efectua = sequelize.define("efectua", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    transferenciaId :{
        type: Sequelize.INTEGER
    },
    beneficiario_donadorId: {
        type: Sequelize.INTEGER
    },
    beneficiario_receptorId: {
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
efectua.sync({force: true});
transferencia.hasOne(efectua, {as:'transferenciaId'});
beneficiario.hasOne(efectua,{as:'beneficiario_donadorId'});
beneficiario.hasOne(efectua,{as:'beneficiario_receptorId'});
efectua.belongsTo(transferencia);
efectua.belongsTo(beneficiario);
efectua.belongsTo(beneficiario);
module.exports = efectua;
