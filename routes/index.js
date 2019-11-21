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
  res.redirect('/signin')
});


module.exports = router;

