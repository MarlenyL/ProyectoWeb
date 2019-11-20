var exportss =  {}
 
exportss.signin = function(req, res) {
 
    res.render('index');
 
}
exportss.principalE = function(req, res) {
    res.render('principalE');
 
}
exportss.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}

module.exports = exportss;
