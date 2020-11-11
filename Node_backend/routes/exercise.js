var express = require('express');
var router = express.Router();
var exerciseController = require('../controllers/exerciseController')

router.post('/add', exerciseController.addExercise);

router.get('/list', exerciseController.listExercises);

router.get('/details', exerciseController.details);

router.post('/save', exerciseController.save);

module.exports = router; 