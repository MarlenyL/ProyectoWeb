var {sequelize,Sequelize} = require('../Database/connection')

const lugar = sequelize.define("lugar", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    nombre :{
        type: Sequelize.STRING
    },
    
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "lugar",
    freezeTableName:true,
    schema: "public"
})
//lugar.sync({force: true});
module.exports = lugar;
