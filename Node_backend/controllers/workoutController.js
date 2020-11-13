const db = require('../models/db')
let authhandler = require("../AuthHandler");

/* POST add exercise to workout */
module.exports.addExercise = async function(req, res) {
    console.log("workoutcontroller addExercise POST")

    authhandler._getAuthor(req, res, async function(req, res, userId) {
        console.log("getAuthor", userId)
        console.log(req.body.workoutId)
        console.log(req.body.exerciseId)
    
        let workoutId = req.body.workoutId;
        let exerciseId = req.body.exerciseId;
    
        let user = await db. findById(userId).exec();
    
        let workout =  workouts.id(workoutId);
        let exercise =  exercises.id(exerciseId);
        exercise.userExerciseId = exercise.id;
    
        workout.exercises.push(exercise);
    
        // Save the new model instance, passing a callback
        try {
            await  save();
            console.log("Added exercise to workout : " + workout.name);
            res.json({success: true});
        } catch (error) {
            console.log(error)
            res.json({success: false});
        }
        res.json({success: false});
    })

}

/* GET list of workouts /workout/list */
module.exports.listUserWorkouts = async function (req, res) {
    console.log("workoutcontroller GET")

    authhandler._getAuthor(req, res, async function(req, res, userId) {
        let user = await db. findById(userId).exec();
        console.log("listworkouts user", user);
        let workouts = [];

        if (user !== null &&  workouts !== null &&  workouts !== undefined)
        {
            for(let i = 0; i <  workouts.length; i++){
                let exercisesString = "";
                
                for(let j = 0; j <  workouts[i].exercises.length; j++)
                {

                    exercisesString = exercisesString + workouts[i].exercises[j].name;
                    if (j !=  workouts[i].exercises.length &&  workouts[i].exercises.length != 0)
                        exercisesString = exercisesString + " ,";
                }
    
                let workout = {
                    id:  workouts[i].id,
                    name:  workouts[i].name,
                    exercises: exercisesString,
                }

                workouts.push(workout);
            }
        }
        
        res.status(200);
        res.json({
            "workouts" : workouts
        });
    });
};


/* GET list of workouts /workout/list */
module.exports.listWorkouts = async function (req, res) {
    let workouts = [];

    db.User.find().then((users) => {
        for(let i = 0; i < users.length; i ++){
            if(users[i].workouts !== undefined){
                for (let j = 0; j < users[i].workouts.length; j++){
                    workouts.push(users[i].workouts[j]);
                }
            }
        }
    
        res.status(200);
        res.json({
            "workouts" : workouts
        });
    });
};

/* POST add workout */
module.exports.addWorkout = async function(req, res) {

    authhandler._getAuthor(req, res, async function(req, res, userId) {
        console.log("workoutcontroller addworkout POST")
        const user = await db.User.findById(userId).exec();

        const newWorkout = new db.Workout();

        newWorkout.name = req.body.name;
        for (let i = 0; i < req.body.exercises.length; i++) {
            newWorkout.exercises.push(req.body.exercises[i]);
        }

        user.workouts.push(newWorkout)
        // Save the new model instance, passing a callback 
        try {
            await user.save();
            console.log("Everything was succesful");
            res.json({success: true});
        } catch (error) {
            console.log(error)
            res.json({success: false});
        }
    });
}
