var {sequelize,Sequelize} = require('../Database/connection')
var usuario = require('../models/usuario'); 

const beneficiario = sequelize.define("beneficiario", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
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
//beneficiario.sync({force: true});
/*usuario.hasMany(beneficiario, {as:'usuarioId'});
beneficiario.belongsTo(usuario);*/
module.exports = beneficiario;