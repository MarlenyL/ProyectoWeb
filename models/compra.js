var {sequelize,Sequelize} = require('../Database/connection')

const compra = sequelize.define("compra", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    id_compra :{
        type: Sequelize.INTEGER
    },
    id_transaccion: {
        type: Sequelize.STRING
    },
    detalle: {
        type: Sequelize.STRING
    },
    
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "compra",
    freezeTableName:true,
    schema: "public"
})
//animals.sync({force:true});
module.exports = compra;
