var express = require('express');
var router = express.Router();
var workoutController = require('../controllers/workoutController')

var jwt = require('express-jwt');
var auth = jwt({
    algorithms: ['HS256'],
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

/* POST add workout */ 
router.post('/', auth, workoutController.addWorkout);  

/* PUT update exercises in workout */
router.put('/:id', auth, workoutController.addExercise); // not used in frontend

/* GET workouts */
router.get('/', workoutController.listWorkouts);

module.exports = router;
