let loggedInHelper = require("../loggedIn");
const db = require('../models/db')

function isLoggedIn (req,res) {
    console.log("is user logged in")
    let user = loggedInHelper.loggedIn(req);
    if (user == null) {
        console.log("user is null");
        res.redirect("/user/login");
        return false;
    }
    console.log("user is not null");
    return true;
}


/* GET list of exercises */
module.exports.listExercises = async function (req, res) {
    console.log("exercisecontroller GET")
    
    if(!isLoggedIn(req,res))
        return;
    else 
    {
        let user = await db.User.findById(req.session.userId).exec();
        let userExercises = user.exercises;

        res.render('exercise-list', {
            exercises : userExercises
        });

        return;
    }
};

/* GET add exercise form */
module.exports.addExerciseForm = function (req, res) {
    console.log("exercisecontroller GET FORM")

    res.render('exercise-add', {
        title: 'exercises-add'
    });
};

/* POST add exercise form */
module.exports.addExercise = async (req,res) => {
    console.log("exercisecontroller POST")
    console.log(req.body.name + ", " + req.body.description)

    let user = await db.User.findById(req.session.userId).exec();
    var exercise = new db.Exercise();
    exercise.name = req.body.name;
    exercise.description = req.body.description;
    exercise.repetitions = req.body.repetitions;
    exercise.sets = req.body.sets;
    
    user.exercises.push(exercise);

    // Save the new model instance, passing a callback
    try {
        await user.save();
        res.redirected = true;
        res.redirect("/exercise/list");
    } catch (error) {
        console.log(error)
        res.send("ERROR")
    }
}


/* POST add exercise form */
module.exports.details = async (req,res) => {
    console.log("exercisecontroller details GET")

    let exerciseId = req.query.exerciseId;
    console.log("Exercise id: " + exerciseId);


    let user = await db.User.findById(req.session.userId).exec();

    let exercise = user.exercises.id(exerciseId);
    console.log(exercise);

    res.render('exercise-details', {
        exercise
    });
}

/* POST add exercise form */
module.exports.save = async (req,res) => {
    console.log("exercisecontroller POST")
    // Save the new model instance, passing a callback
    
    if(!isLoggedIn(req,res))
        return;
    else 
    {
        let user = await db.User.findById(req.session.userId).exec();
        let exercise = user.exercises.id(req.body.id);
        console.log(exercise);
        
        exercise.name = req.body.name;
        exercise.description = req.body.description;
        exercise.repetitions = req.body.repetitions;
        exercise.sets = req.body.sets;

        // Save the new model instance, passing a callback
        try {
            user.save();
            console.log("Succesfully saved exercise")
            res.redirect('/exercise/list')
            
        } catch (error) {
            console.log(error)
            res.redirect('/exercise/details?exerciseId=' + req.body.id)
        }


        return;
    }
}