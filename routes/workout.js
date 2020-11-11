var express = require('express');
var router = express.Router();
var workoutController = require('../controllers/workoutController')

/* GET add workout form */
router.get('/add', workoutController.addWorkoutForm);

/* POST add workout form */
router.post('/add', workoutController.addWorkout);  

/* GET add workout form */
router.get('/details', workoutController.details);

/* POST add workout form */
router.post('/addExercise', workoutController.addExercise);

/* POST add workout form */
// router.post('/removeExercise', workoutController.removeExercise);

/* GET users listing. */
router.get('/list', workoutController.listWorkouts);

module.exports = router;
