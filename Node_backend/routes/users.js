var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

var jwt = require('express-jwt');
var auth = jwt({
secret: process.env.JWT_SECRET,
algorithms: ['HS256'],
userProperty: 'payload'
});

/* POST add user form */
router.post('/', userController.register);

router.post('/login', userController.login);


module.exports = router;
