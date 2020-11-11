var express = require('express');
var router = express.Router();
var workoutController = require('../controllers/workoutController')

var jwt = require('express-jwt');
var auth = jwt({
algorithms: ['RS256'],
secret: process.env.JWT_SECRET,
userProperty: 'payload'
});

/* POST add workout form */
router.post('/add', auth, workoutController.addWorkout);  

/* POST add workout form */
router.post('/addExercise', auth, workoutController.addExercise);

/* GET users listing. */
router.get('/list', auth, workoutController.listWorkouts);

module.exports = router;
