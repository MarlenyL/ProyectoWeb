var express = require('express');
var router = express.Router();
var StudentManager = require('../controllers/StudentManager');


router.get('/',isLoggedIn,function(req, res, next) {
  var data = req.user;
  data['saldo'] = StudentManager.saldo(data,res)
  .then(function(data){
    console.log(data);
    res.render('principalE',data)
  })
});

function isLoggedIn(req, res, next) {
 
  if (req.isAuthenticated()){
      return next();
  }
  res.redirect('/signin');

}
module.exports = router;