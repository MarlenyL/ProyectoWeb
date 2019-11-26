var {sequelize,Sequelize} = require('../Database/connection')
var usuario = require('../models/usuario');
 

const empleado = sequelize.define("empleado", {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    usuarioId:{
        type:Sequelize.INTEGER
    },
    telefono :{
        type: Sequelize.STRING
    }  
},
{
    timestamps: false,
    createdAt:false,
    updatedAt: false,
    tableName: "empleado",
    freezeTableName:true,
    schema: "public"
})
empleado.sync({force: true});
usuario.hasMany(empleado, {as:'usuarioId'});
empleado.belongsTo(usuario);
module.exports = empleado;