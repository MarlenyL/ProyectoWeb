
var {sequelize,Sequelize}= require('../Database/connection')
var usuario = require('../models/usuario');
const text = 'SELECT * FROM "usuario" where "usuario" = $1 and "contrasea"= $2'
const values = ['00153118','00153118'];
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .then(()=>{
    usuario.findAll().then(usuario => {
        console.log("All users:", JSON.stringify(usuario, null, 4));
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/*module.exports.consultar = (values) => {
    //conexion.client.connect(
        conexion.client.query(text,values)
        .then((res, req) => {
            var result = res.rows[0];
            req.session.info = result;
        })
        .catch(e => console.error(e.stack))
    //)
}*/
