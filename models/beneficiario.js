var {sequelize,Sequelize} = require('../Database/connection')
var usuario = require('../models/usuario'); 

const beneficiario = sequelize.define("beneficiario", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    id_usuario:{
        type:Sequelize.INTEGER,
        references: usuario,
        referenceKey: 'id',
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
usuario.hasMany(beneficiario);
beneficiario.belongsTo(usuario);
module.exports = beneficiario;