var express = require('express');
var router = express.Router();
var passport   = require('passport');
var StudentManager = require('../controllers/StudentManager');


router.get('/',isLoggedIn,function(req, res, next) {
  console.log(req.user);
  res.render('principalE',req.user);
});

function isLoggedIn(req, res, next) {
 
  if (req.isAuthenticated()){
      return next();
  }
  res.redirect('/signin');

}
module.exports = router;