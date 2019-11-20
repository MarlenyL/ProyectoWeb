var exports = module.exports = {}
 
exports.signup = function(req, res) {
 
    res.render('login');
 
}
exports.signin = function(req, res) {
 
    res.render('signin');
 
}
exports.principalE = function(req, res) {
 
    res.render('principalE');
 
}
exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}