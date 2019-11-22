var {sequelize,Sequelize} = require('../Database/connection')
var transaccion = require('../models/Transaccion')

const transferencia = sequelize.define("transferencia", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    id_transaccion: {
        type: Sequelize.INTEGER,
        references: transaccion,
        referenceKey: 'id',
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
transaccion.hasMany(transferencia);
transferencia.belongsTo(transaccion);
module.exports = transferencia;
