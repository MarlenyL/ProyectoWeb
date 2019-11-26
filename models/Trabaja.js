var { sequelize, Sequelize } = require('../Database/connection')
var lugar = require('../models/lugar');
var empleado = require('../models/empleado');


const trabaja = sequelize.define("trabaja", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    lugarId: {
        type: Sequelize.INTEGER,
    },
    empleadoId: {
        type: Sequelize.INTEGER,
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
        createdAt: false,
        updatedAt: false,
        tableName: "trabaja",
        freezeTableName: true,
        schema: "public"
    })

trabaja.sync({force: true});
lugar.hasMany(trabaja);
empleado.hasMany(trabaja);
trabaja.belongsTo(lugar);
trabaja.belongsTo(empleado);

module.exports = trabaja;
