var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var database = require('../Database/elephantsql');
var app = express();
var pg = require('pg')
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'STE' });
});

var conString = "postgres://bsotqenl:SIi5Keq54evR9YTlT-3uQLL57vg0DDGA@salt.db.elephantsql.com:5432/bsotqenl" //Can be found in the Details page
var client = new pg.Client(conString);

var StudentManager = require('../controllers/StudentManager');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/principalE', function(req, res, next) {
  var values  = [req.body.usuario,req.body.contrasea];
  var info = StudentManager.consultar(values);
  console.log(info);
  //res.render('principalE', info);
});


/* GET users listing. */
router.post('/', function (req, res, next) {
  var username = req.body.user;
  var password = req.body.password;

  console.log(username);
  console.log(password);
  var quer ="SELECT * FROM usuario WHERE usuario = " +"'"+username+"'" +" AND contrasea = "+"'"+password+"'";
  console.log(quer);
  
	if (username && password) {
		client.query(quer, function(error, results, fields) {
      console.log(results);
     client.end();
      if (error) {
        res.send('Incorrect Username and/or Password!');
			
			} else {
				res.render('/principalE');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
  }})


module.exports = router;

