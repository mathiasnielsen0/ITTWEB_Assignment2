// //let workouts = [];
// let loggedInHelper = require("../loggedIn");
// const db = require('../models/db')

// function isLoggedIn (req,res) {
//     console.log("is user logged in")
//     let user = loggedInHelper.loggedIn(req);
//     if (user == null) {
//         console.log("user is null");
//         res.redirect("/user/login");
//         return false;
//     }
//     console.log("user is not null");
//     return true;
// }

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
    
        let user = await db.User.findById(userId).exec();
    
        let workout = user.workouts.id(workoutId);
        let exercise = user.exercises.id(exerciseId);
        exercise.userExerciseId = exercise.id;
    
        workout.exercises.push(exercise);
    
        // Save the new model instance, passing a callback
        try {
            await user.save();
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
module.exports.listWorkouts = async function (req, res) {
    console.log("workoutcontroller GET")

    authhandler._getAuthor(req, res, async function(req, res, userId) {
        let user = await db.User.findById(userId).exec();
        console.log("listworkouts user", user);
        let workouts = [];

        if (user !== null && user.workouts !== null && user.workouts !== undefined)
        {
            for(let i = 0; i < user.workouts.length; i++){
                let exercisesString = "";
                
                for(let j = 0; j < user.workouts[i].exercises.length; j++)
                {

                    exercisesString = exercisesString +user.workouts[i].exercises[j].name;
                    if (j != user.workouts[i].exercises.length && user.workouts[i].exercises.length != 0)
                        exercisesString = exercisesString + " ,";
                }
    
                let workout = {
                    id: user.workouts[i].id,
                    name: user.workouts[i].name,
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


/* POST add workout */
module.exports.addWorkout = async function(req, res) {
    // if(!isLoggedIn(req,res))
    //     return;

    console.log("workoutcontroller addworkout POST")
    console.log(req.body.name);
    console.log(req.body.exerciseIds);
    let user = await db.User.findById(req.session.userId).exec();

    let newWorkout = new db.Workout();

    newWorkout.name = req.body.name;

    for (let i = 0; i < req.body.exerciseIds.length; i++)
    {
        console.log("current id = " + req.body.exerciseIds[i])
        let exercise = user.exercises.id(req.body.exerciseIds[i]);
        exercise.userExerciseId = req.body.exerciseIds[i];
        console.log("req.body.exerciseIds[i] = " + req.body.exerciseIds[i]);
        newWorkout.exercises.push(exercise);
        console.log("tesdfsdfsd")
    }

    user.workouts.push(newWorkout);

    // Save the new model instance, passing a callback
    try {
        await user.save();
        console.log("Everything was succesful");
        res.json({success: true});
    } catch (error) {
        console.log(error)
        res.json({success: false});
    }
}

// /* GET add Workout form */
// module.exports.addWorkoutForm = async function (req, res) {
//     console.log("workoutcontroller GET FORM")
//     if(!isLoggedIn(req,res))
//         return;

//     let user = await db.User.findById(req.session.userId);
//     let userExercises = user.exercises;
//     console.log("render form");

//     res.render('workout-add', {
//         addedexercises: [],
//         notaddedexercises: userExercises
//     });
// };

// /* GET add Workout form */
// module.exports.details = async (req, res) => {
//     console.log("workoutcontroller details GET FORM")
//     if(!isLoggedIn(req,res))
//         return;

//     let user = await db.User.findById(req.session.userId);
//     let workoutId = req.query.workoutId;
//     let workout = user.workouts.id(workoutId);
//     let workoutExercises = workout.exercises;
//     let userExercises = user.exercises;
//     let notAddedExercises = [];
//     let alreadyExists = false;

//     for(let i = 0; i < userExercises.length;i++)
//     {

//         alreadyExists = false;
//         for (let j = 0; j < workoutExercises.length; j++)
//         {
//             console.log("userExerciseId = " + workoutExercises[j].userExerciseId)
//             console.log(userExercises[i].id)
//             if (workoutExercises[j].userExerciseId == userExercises[i].id){
//                 alreadyExists = true;
//                 console.log("Exercise already exists: " + userExercises[i].name)
//             }
//         }
        
//         if (!alreadyExists){
//             console.log("adding exercise: #" + i);
//             notAddedExercises.push(userExercises[i]);
//         }
//     }

//     res.render('workout-details', {
//         id: workoutId,
//         name : workout.name,
//         addedexercises: workoutExercises,
//         notaddedexercises: notAddedExercises
//     });
// };


// /* POST add workout form */
// module.exports.removeExercise = async (req, res) => {
//     console.log("workoutcontroller addExercise POST")
//     if(!isLoggedIn(req,res))
//         return;

//     console.log("workoutId = " + req.body.workoutId)
//     console.log("exerciseId = " + req.body.exerciseId)

//     let workoutId = req.body.workoutId;
//     let exerciseId = req.body.exerciseId;

//     let user = await db.User.findById(req.session.userId).exec();

//     console.log(user);
//     let exercise = user.workouts.exercises.id(exerciseId);
//     console.log("-------")
//     console.log("-------")
//     console.log("-------")
//     console.log("-------")
//     console.log("-------")
//     console.log(exercise);
//     console.log("-------")
//     console.log("-------")
//     console.log("-------")
//     console.log("-------")
//     console.log("-------")

//     let workout = user.workouts.id(workoutId);
    
//     let workoutExercises = workout.exercises;
//     console.log(workoutExercises);
//     for(let i = 0; i < workoutExercises.length; i++){
//         if(workoutExercises[i].id == exerciseId){
//             delete workoutExercises[i];
//             console.log("removed exercise");
//         }
//     }

//     workout.exercises = workoutExercises;


//     // Save the new model instance, passing a callback
//     try {
//         await user.save();
//         console.log("Removed exercise to workout : " + workout.name);
//         res.json({success: true});
//     } catch (error) {
//         console.log(error)
//         res.json({success: false});
//     }

//     res.json({success: false});

// }
