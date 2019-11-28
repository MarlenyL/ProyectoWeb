var {sequelize,Sequelize} = require('../Database/connection')
var compra = require('../models/compra');
var beneficiario = require('../models/beneficiario');
var empleado = require('../models/empleado');
var lugar = require('../models/lugar')

const realiza = sequelize.define("realiza", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    /*compraId:{
        type: Sequelize.INTEGER,
    },
    beneficiarioId: {
        type: Sequelize.INTEGER,
    },
    empleadoId: {
        type: Sequelize.INTEGER,
    },
    lugarId: {
        type: Sequelize.INTEGER,
    },*/
    monto: {
        type: Sequelize.DECIMAL(10,2)
    },
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "realiza",
    freezeTableName:true,
    schema: "public"
})
//realiza.sync({force: true});
compra.hasOne(realiza);
beneficiario.hasOne(realiza);
empleado.hasOne(realiza);
lugar.hasOne(realiza);
realiza.belongsTo(compra);
realiza.belongsTo(beneficiario);
realiza.belongsTo(empleado);
realiza.belongsTo(lugar);
module.exports = realiza;
