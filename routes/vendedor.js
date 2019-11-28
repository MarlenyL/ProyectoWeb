var express = require('express');
var router = express.Router();
var StudentManager = require('../controllers/StudentManager');
//var passport   = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  StudentManager.saldo(req.user.id, function (mod) {
    var data =  {saldo:mod, user:req.user, transacciones: StudentManager.transacciones};
    res.render('vendedor',data)
});  
});

module.exports = router;