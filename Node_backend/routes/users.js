var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

/* POST add user form */
router.post('/create', userController.AddNewUser);

router.post('/login', userController.Login);

router.get('/logout', userController.Logout);

module.exports = router;
