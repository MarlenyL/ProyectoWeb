var {sequelize,Sequelize} = require('../Database/connection')

const usuarios = sequelize.define("usuarios", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    id_compra :{
        type: Sequelize.INTEGER
    },
    id_beneficiario: {
        type: Sequelize.INTEGER
    },
    id_empleado: {
        type: Sequelize.INTEGER
    },
    id_lugar: {
        type: Sequelize.INTEGER
    },
    monto: {
        type: Sequelize.DECIMAL(10,2)
    },
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "usuarios",
    freezeTableName:true,
    schema: "public"
})
//animals.sync({force:true});
module.exports = usuarios;
