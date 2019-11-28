var express = require('express');
var router = express.Router();
var StudentManager = require('../controllers/StudentManager');
var imgChange = require('../config/cloudinary');

/* GET home page. */
router.get('/', function(req, res, next) {
  StudentManager.saldo(req.user.id, function (mod) {
    var data = {saldo:mod, user:req.user};
    res.render('imgChange',data)
}); 
});
//router.post("/",imgChange);
module.exports = router;