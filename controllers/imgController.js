var usuario = require('../models/usuario');


var usuario = {};
usuario.saldo = function(req,res){
    var id=req.id;
    obtenerSaldo(id);
    
}

var obtenerSaldo=function(id, ruta ){
    var User = usuario;
    User.update(
        {foto: ruta},
        {where: id}
      )
      .then(function(rowsUpdated) {
        res.json(rowsUpdated)
      });
}