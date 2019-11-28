var {sequelize,Sequelize} = require('../Database/connection')
var transaccion = require('../models/Transaccion')

const compra = sequelize.define("compra", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    detalle: {
        type: Sequelize.STRING
    },
    tipo: {
        type: Sequelize.TEXT
    }
    
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "compra",
    freezeTableName:true,
    schema: "public"
})
//compra.sync({force: true});
/*transaccion.hasMany(compra);
compra.belongsTo(transaccion);*/
module.exports = compra;
