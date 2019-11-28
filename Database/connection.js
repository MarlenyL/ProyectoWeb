const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://bsotqenl:SIi5Keq54evR9YTlT-3uQLL57vg0DDGA@salt.db.elephantsql.com:5432/bsotqenl');


sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

sequelize.sync()
.then(()=>{
  console.log("MOdelos sincronizados exitosamente")
});
module.exports = {sequelize,Sequelize};