var express = require('express');
var router = express.Router();
var StudentManager = require('../controllers/StudentManager');

var imageController = require('../controllers/imgChangeController');
var upload = require('../config/multer');
/* GET home page. */


router.get('/', function(req, res, next) {
  StudentManager.saldo(req.user.id, function (mod) {
    var data = {saldo:mod, user:req.user, id: req.user.id};
    res.render('imgChange',data)
}); 
});
/*
router.post('/', upload.any(), imageController.createApp, function(req, res, next) {
  StudentManager.saldo(req.user.id, function (mod) {
    var data = {saldo:mod, user:req.user, id: req.user.id};
    res.render('imgChange',data)
}); 
});
*/
module.exports = router;