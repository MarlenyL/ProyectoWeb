var express = require('express');
var router = express.Router();
var StudentManager = require('../controllers/StudentManager');


router.get('/', function(req, res, next) {
  res.render('principalE',StudentManager.get());
});

module.exports = router;