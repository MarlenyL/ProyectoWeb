var usuario = require('../models/usuario');


var usuario = {};
usuario.foto = function(req,res){
    var id=req.id;
var actulizarFoto=function(id, ruta ){
  actulizarFoto(id);
    
}
}
var actulizarFoto =function(id, ruta ){
    var User = usuario;
    User.update(
        {foto: ruta},
        {where: id}
      )
      .then(function(rowsUpdated) {
        res.json(rowsUpdated)
      });
}