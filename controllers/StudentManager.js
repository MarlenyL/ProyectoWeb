var modelo = require('../models/beneficiario');

var beneficiario = {};
beneficiario.saldo = async function(req,res){
    var id=req.id;
    obtenerSaldo(id);
}

var obtenerSaldo=function(id=4){
    var Modelo = modelo;
    Modelo.findByPk(id,{attributes:['saldo']})
    .then(function(modelo) {
            
        if (modelo) {
            console.log(JSON.stringify(modelo.get()))
            return JSON.stringify(modelo.get());
        }
        else{
            return 0;
        }
 
    });
}
//transferencia.sync({force: true});
//obtenerSaldo();
/*function(req, usuario, contrasea, done) {
    
    var id = ;
    
    var isValidPassword = function(userpass, contrasea) {
        
        if (userpass==contrasea){
            return true;
        }
        return false;

    }

    User.findOne({
        where: {
            usuario: usuario
        }
    }).then(function(user) {
        if (!user) {
            
            return done(null, false, {
                message: 'Credenciales incorrectas'
            });

        }

        if (!isValidPassword(user.contrasea, contrasea)) {

            return done(null, false, {
                message: 'Credenciales incorrectas'
            });

        }


        var userinfo = user.get();
        return done(null, userinfo);


    }).catch(function(err) {

        console.log("Error:", err);

        return done(null, false, {
            message: 'Something went wrong with your Signin'
        });

    });*/

module.exports = beneficiario;
