var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

/* POST add user form */
router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/logout', userController.Logout);

module.exports = router;
