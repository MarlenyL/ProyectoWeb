var express = require('express');
var router = express.Router();
var passport   = require('passport');
var authController = require('../controllers/authcontroller');

router.get('/', authController.logout);

module.exports = router;