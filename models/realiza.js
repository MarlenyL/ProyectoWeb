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
    id_compra :{
        type: Sequelize.INTEGER,
        references: compra,
        referenceKey: 'id',
    },
    id_beneficiario: {
        type: Sequelize.INTEGER,
        references: beneficiario,
        referenceKey: 'id',
    },
    id_empleado: {
        type: Sequelize.INTEGER,
        references: empleado,
        referenceKey: 'id',
    },
    id_lugar: {
        type: Sequelize.INTEGER,
        references: lugar,
        referenceKey: 'id',
    },
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
compra.hasOne(realiza);
beneficiario.hasOne(realiza);
empleado.hasOne(realiza);
lugar.hasOne(realiza);

module.exports = realiza;
