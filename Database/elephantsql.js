var pg = require('pg');
//or native libpq bindings
//var pg = require('pg').native
var conString = "postgres://bsotqenl:SIi5Keq54evR9YTlT-3uQLL57vg0DDGA@salt.db.elephantsql.com:5432/bsotqenl" //Can be found in the Details page
var client = new pg.Client(conString);

const conn = (err)=>{
  //client.connect();
  client.connect(conn2 = (err)=>{

    if(err) {
      return console.error('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].theTime);
    
    })});
  }

module.exports= {conn, client};



