var {sequelize,Sequelize} = require('../Database/connection')

const trabaja = sequelize.define("trabaja", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    id_lugar :{
        type: Sequelize.INTEGER
    },
    id_empleado: {
        type: Sequelize.INTEGER
    },
    fecha_inicio: {
        type: Sequelize.DATEONLY
    },
    fecha_fin: {
        type: Sequelize.DATEONLY
    },
    
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "trabaja",
    freezeTableName:true,
    schema: "public"
})
//animals.sync({force:true});
module.exports = trabaja;
