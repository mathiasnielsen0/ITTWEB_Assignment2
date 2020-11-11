var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')

/* GET add user form */
router.get('/signup', userController.AddNewUserForm);

/* POST add user form */
router.post('/create', userController.AddNewUser);

/* GET user login. */
router.get('/login', userController.LoginForm);

router.post('/login', userController.Login);

router.get('/logout',userController.Logout);

router.get('/ThankYou',userController.UserThankYou)

module.exports = router;
