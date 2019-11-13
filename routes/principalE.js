var express = require('express');
var router = express.Router();

/*GET prncipal page estudiante */
router.get('/', function(req, res, next) {
  res.render('principalE', { title: 'SET'});
});

module.exports = router;