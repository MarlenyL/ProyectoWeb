
module.exports= function(passport,user){
    var User=user;
    var LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function(user, done) {
 
        done(null, user.id);
     
    })
    passport.deserializeUser(function(id, done) {
        
        User.findByPk(id).then(function(user) {
            
            if (user) {
     
                done(null, user.get());
     
            } else {
     
                done(user.errors, null);
     
            }
     
        });
     
    });
    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
    
        {
    
            // by default, local strategy uses username and password, we will override with usuario
    
            usernameField: 'usuario',
    
            passwordField: 'contrasea',
    
            passReqToCallback: true // allows us to pass back the entire request to the callback
    
        },
    
    
        function(req, usuario, contrasea, done) {
    
            var User = user;
            
            var isValidPassword = function(userpass, contrasea) {
                
                if (userpass==contrasea){
                    return true;
                }
                return false;
    
            }
    
            User.findOne({
                where: {
                    usuario: usuario
                }
            }).then(function(user) {
                if (!user) {
                    
                    return done(null, false, {
                        message: 'usuario does not exist'
                    });
    
                }
    
                if (!isValidPassword(user.contrasea, contrasea)) {
    
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
    
                }
    
    
                var userinfo = user.get();
                return done(null, userinfo);
    
    
            }).catch(function(err) {
    
                console.log("Error:", err);
    
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
    
            });
    
    
        }
    
    ));
}



