var express = require('express');
var router = express.Router();
var StudentManager = require('../controllers/StudentManager');
//var passport   = require('passport');

/* GET home page. */
router.get('/',isLoggedIn,function(req, res, next) {
  StudentManager.transacciones(req.user.id, function (mod) {
      var data = {transaciones:mod, user:req.user};
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