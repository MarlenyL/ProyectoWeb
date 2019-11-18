
/*var StudentManager = {};

let myJson={
    name: 'Rocio Marleny Landaverde Solis',
    someone:'rocio',
    saldo: 20
}

module.exports = {myJson};
*/

var conexion = require('../Database/elephantsql.js')
var usuario = require('../models/usuario');
const text = 'SELECT * FROM "usuario" where "usuario" = $1 and "contrasea"= $2'
//const values = ['00153118','00153118'];
module.exports.consultar = (values) => {
    //conexion.client.connect(
        conexion.client.query(text,values)
        .then((res, req) => {
            var result = res.rows[0];
            req.session.info = result;
        })
        .catch(e => console.error(e.stack))
    //)
}
