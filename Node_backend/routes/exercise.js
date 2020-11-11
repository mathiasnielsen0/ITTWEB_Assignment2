var express = require('express');
var router = express.Router();
var exerciseController = require('../controllers/exerciseController')

var jwt = require('express-jwt');
var auth = jwt({
secret: process.env.JWT_SECRET,
algorithms: ['RS256'],
userProperty: 'payload'
});

router.post('/add', auth, exerciseController.addExercise);

router.get('/list', auth, exerciseController.listExercises);

router.get('/details', auth, exerciseController.details);

router.post('/save', auth, exerciseController.save);

module.exports = router; 