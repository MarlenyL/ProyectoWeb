var express = require('express');
var router = express.Router();
var StudentManager = require('../controllers/StudentManager');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/signin')
});

/*router.post('/principalE', function(req, res, next) {
  var values  = [req.body.usuario,req.body.contrasea];
  var info = StudentManager.consultar(values);
  console.log(info);
  //res.render('principalE', info);
});*/



module.exports = router;
