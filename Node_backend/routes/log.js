var express = require('express');
var router = express.Router();
var logController = require('../controllers/logController')

var jwt = require('express-jwt');
var auth = jwt({
    algorithms: ['HS256'],
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

/* POST add workout form */ 
router.post('/', auth, logController.add);  

/* POST add workout form */
router.get('/', auth, logController.get); 


module.exports = router;
