const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://wdpdgbvn:6bJjbdfE0G1RAXs8ra2EErf8X2LT1zO7@isilo.db.elephantsql.com:5432/wdpdgbvn');
/*const sequelize = new Sequelize('base', 'admin', 'root',{
  host:'localhost',
  dialect: 'postgres'
})*/

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {sequelize,Sequelize};