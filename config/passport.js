
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
    passport.use('local-signin', new LocalStrategy(
    
        {
    
            usernameField: 'usuario',
    
            passwordField: 'contrasea',

            nameField: 'nombre',
            
            passReqToCallback: true 
    
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
                        message: 'Credenciales incorrectas'
                    });
    
                }
    
                if (!isValidPassword(user.contrasea, contrasea)) {
    
                    return done(null, false, {
                        message: 'Credenciales incorrectas'
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



