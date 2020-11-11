var express = require('express');
var router = express.Router();
var workoutController = require('../controllers/workoutController')

/* POST add workout form */
router.post('/add', workoutController.addWorkout);  

/* POST add workout form */
router.post('/addExercise', workoutController.addExercise);

/* GET users listing. */
router.get('/list', workoutController.listWorkouts);

module.exports = router;
