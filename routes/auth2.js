var authController = require('../controllers/authcontroller');
 
module.exports = function(app,passport) {
 
    app.get('/', authController.signin);
    app.get('/principalE',isLoggedIn,authController.principalE);
    app.get('/logout', authController.logout);
 
 
    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/principalE',
 
            failureRedirect: '/signin'
        }
 
    ));
 
 
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
 
            return next();
 
        res.redirect('/signin');
 
    }
 
}