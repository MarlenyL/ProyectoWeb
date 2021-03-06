var express = require('express');
var router = express.Router();
var passport   = require('passport');
var authController = require('../controllers/authcontroller');
 

 
router.get('/', authController.signin);

 
router.get('/principalE',isLoggedIn,authController.principalE);


router.post('/', passport.authenticate('local-signin', {
        successRedirect: '/principalE',
 
        failureRedirect: '/signin'
    }
))

 
 
function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/signin');
 
}/*
function isLoggedIn(req, res, next) {
 
    if (req.isAuthenticated()){
        res.redirect('/principalE');
    }
    res.redirect('/signin');
  }
 
 */


module.exports = router;
 
