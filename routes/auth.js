var express = require('express');
var router = express.Router();
var passport   = require('passport');
var authController = require('../controllers/authcontroller');
 

 
router.get('/', authController.signin);

 
router.get('/principalE',authController.principalE);


router.post('/', passport.authenticate('local-signin', {
        successRedirect: '/principalE',
 
        failureRedirect: '/signin'
    }
));

function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated()){
        res.redirect('/principalE');
    }
    
  
  }
 
 


module.exports = router;
 
