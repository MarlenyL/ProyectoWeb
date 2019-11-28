var modelo = require('../models/beneficiario');
var realiza = require('../models/realiza');
var lugar = require('../models/lugar');
var compra = require('../models/compra');
var transaccion = require('../models/Transaccion');

var beneficiario = {};
beneficiario.saldo = async function(id, callback){
    var Modelo = modelo;
    Modelo.findByPk(id,{attributes:['saldo']})
    .then(function(modelo) { 
        var mod = {};           
        if (modelo) {
            mod = modelo.get();
        }
        return callback(mod);
    });
}

beneficiario.transacciones = async function(id, callback){
    var query = {
        where: {beneficiarioId: 4},
        include: [
            {model:lugar},
            {
                model:compra,
                include:[
                    {model:transaccion}
                ]
            },
            
        ]
    }
    var Realiza= realiza;
    Realiza.findAll(query,{attributes:['"realiza"."Id"','"transaccion"."fecha"','"compra"."tipo"','"realiza"."monto"','"compra"."detalle"','"lugar"."nombre"']})
    .then(function(realiza) { 
        var real = {};           
        if (realiza) {
            console.log(JSON.stringify(realiza));
            real = JSON.stringify(realiza);
        }
        return callback(real);
    });
}

module.exports = beneficiario;
