var express = require('express');
var router = express.Router();
var StudentManager = require('../controllers/StudentManager');
//var passport   = require('passport');

/* GET home page. */
router.get('/',isLoggedIn,function(req, res, next) {
  StudentManager.saldo(req.user.id, function (mod) {
      var data =  {saldo:mod, user:req.user, transacciones: StudentManager.transacciones};
      res.render('transaccionesE',data)
  });  
});

function isLoggedIn(req, res, next) {

  if (req.isAuthenticated()){
      
      return next();
  }
  res.redirect('/signin');

}

module.exports = router;