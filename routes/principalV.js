var express = require('express');
var router = express.Router();
var StudentManager = require('../controllers/StudentManager');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('principalV')
});


module.exports = router;

