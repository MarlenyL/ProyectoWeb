var Relaciones = {};

Relaciones.init = function (usuario, transaccion, lugar, beneficiario, empleado, transferencia, compra, trabaja, efectua, realiza) {

    //beneficiario
    usuario.hasMany(beneficiario);
    beneficiario.belongsTo(usuario);
    //empleado
    usuario.hasMany(empleado);
    empleado.belongsTo(usuario);

    //transferencia
    transaccion.hasMany(transferencia);
    transferencia.belongsTo(transaccion);

    //compra
    transaccion.hasMany(compra);
    compra.belongsTo(transaccion);

    //trabaja
    lugar.hasMany(trabaja);
    empleado.hasMany(trabaja);
    trabaja.belongsTo(lugar);
    trabaja.belongsTo(empleado);

    //efectua
    transferencia.hasOne(efectua);
    //beneficiario.hasOne(efectua,{foreignKey:'beneficiario_donadorId'});
    //beneficiario.hasOne(efectua,{foreignKey:'beneficiario_receptorId'});
    efectua.belongsTo(transferencia,);
    //efectua.belongsTo(beneficiario);
    //efectua.belongsTo(beneficiario);

    //realiza
    compra.hasOne(realiza);
    beneficiario.hasMany(realiza);
    empleado.hasMany(realiza);
    lugar.hasMany(realiza);
    realiza.belongsTo(compra);
    realiza.belongsTo(beneficiario);
    realiza.belongsTo(empleado);
    realiza.belongsTo(lugar);

}

module.exports = Relaciones;
