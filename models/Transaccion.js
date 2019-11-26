var {sequelize,Sequelize} = require('../Database/connection')

const transaccion = sequelize.define("transaccion", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    monto_inicial:{
        type: Sequelize.DECIMAL(10, 2)  
    },
    monto_final: {
        type: Sequelize.DECIMAL(10, 2)  
    },
    fecha: {
        type: Sequelize.DATEONLY
    },
    
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "transaccion",
    freezeTableName:true,
    schema: "public"
})
//transaccion.sync({force: true})
module.exports = transaccion;
