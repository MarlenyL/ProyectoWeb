var express = require('express');
var router = express.Router();
var StudentManager = require('../controllers/StudentManager');
var passport = require('passport');

router.get('/',isLoggedIn,function(req, res, next) {
    StudentManager.saldo(req.user.id, function (mod) {
        var data = {saldo:mod, user:req.user};
        res.render('principalE',data)
    });  
});

function isLoggedIn(req, res, next) {
 
  if (req.isAuthenticated()){
      
      return next();
  }
  res.redirect('/signin');

}
module.exports = router;