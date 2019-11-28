var {sequelize,Sequelize} = require('../Database/connection')
var transaccion = require('../models/Transaccion')

const transferencia = sequelize.define("transferencia", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    transaccionId:{
        type:Sequelize.INTEGER,
    }
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "transferencia",
    freezeTableName:true,
    schema: "public"
})
//transferencia.sync({force: true});
transaccion.hasMany(transferencia,{as:'transaccionId'});
transferencia.belongsTo(transaccion);
module.exports = transferencia;
