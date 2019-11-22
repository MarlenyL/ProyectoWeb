var {sequelize,Sequelize} = require('../Database/connection')
var usuario = require('../models/usuario'); 

const empleado = sequelize.define("empleado", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    id_usuario:{
        type:Sequelize.INTEGER,
        references: usuario,
        referenceKey: 'id',
    },
    telefono :{
        type: Sequelize.STRING
    },
    
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "animals",
    freezeTableName:true,
    schema: "public"
})
usuario.hasMany(empleado);
empleado.belongsTo(usuario);
module.exports = empleado;