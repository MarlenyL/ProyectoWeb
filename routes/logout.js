var express = require('express');
var router = express.Router();
var authController = require('../controllers/authcontroller');

router.get('/', authController.logout);

module.exports = router;