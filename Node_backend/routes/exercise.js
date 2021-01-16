var express = require('express');
var router = express.Router();
var exerciseController = require('../controllers/exerciseController')

var jwt = require('express-jwt');
var auth = jwt({
secret: process.env.JWT_SECRET,
algorithms: ['HS256'],
userProperty: 'payload'
});

router.post('/', auth, exerciseController.addExercise);

router.get('/', exerciseController.listExercises);

router.get('/:id', exerciseController.details);

router.put('/', auth, exerciseController.save);// not used in frontend

module.exports = router; 