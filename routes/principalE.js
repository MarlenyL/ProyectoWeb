var express = require('express');
var router = express.Router();
var StudentManager = require('../controllers/StudentManager');
var passport = require('passport');

router.get('/',isLoggedIn,function(req, res, next) {
  var saldo = StudentManager;
  console.log(saldo.saldo(req.user.id));
  res.render('principalE',{saldo:saldo.saldo(req.user.id),user:req.user})
});

function isLoggedIn(req, res, next) {
 
  if (req.isAuthenticated()){
      
      return next();
  }
  res.redirect('/signin');

}
module.exports = router;