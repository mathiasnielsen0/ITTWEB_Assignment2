var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

var jwt = require('express-jwt');
var auth = jwt({
secret: process.env.JWT_SECRET,
userProperty: 'payload'
});

/* POST add user form */
router.post('/create', userController.AddNewUser);

router.post('/login', userController.Login);

router.get('/logout', userController.Logout);

module.exports = router;
