var { sequelize, Sequelize } = require('../Database/connection')
var lugar = require('../models/lugar');
var empleado = require('../models/empleado');


const trabaja = sequelize.define("trabaja", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_lugar: {
        type: Sequelize.INTEGER,
        references: lugar,
        referenceKey: 'id',
    },
    id_empleado: {
        type: Sequelize.INTEGER,
        references: empleado,
        referenceKey: 'id',
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

lugar.belongsToMany(trabaja);
empleado.belongsToMany(trabaja);

module.exports = trabaja;
