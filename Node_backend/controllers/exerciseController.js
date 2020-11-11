const db = require('../models/db')
let authhandler = require("../AuthHandler");

/* GET list of exercises */
module.exports.listExercises = async function (req, res) {
    console.log("exercisecontroller GET")
    
    // if(!isLoggedIn(req,res))
    //     return;
    if(false){}
    else 
    {
        res.json({
            userExercises
        });

        return;
    }
};

//Post 
module.exports.addExercise = async (req,res) => {

    authhandler._getAuthor(req, res, async function(req, res, userId) {
        let user = await db.User.findById(userId).exec();
        var exercise = new db.Exercise();
        exercise.name = req.body.name;
        exercise.description = req.body.description;
        exercise.repetitions = req.body.repetitions;
        exercise.sets = req.body.sets;
        
        user.exercises.push(exercise);

        // Save the new model instance, passing a callback
        try {
            await user.save();
            res.status(200);
            res.json({"message": "success"})
        } catch (error) {
            console.log(error)
            res.send("ERROR")
        }
    });
}


/* POST add exercise form */
module.exports.details = async (req,res) => {
    console.log("exercisecontroller details GET")

    let exerciseId = req.query.exerciseId;
    console.log("Exercise id: " + exerciseId);
    authhandler._getAuthor(req, res, async function(req, res, userId) {
        let user = await db.User.findById(userId).exec();

        let exercise = user.exercises.id(exerciseId);
        console.log(exercise);

        res.status(200);
        res.json({
            "exercise" : exercise
        });
    });
}

/* POST add exercise form */
module.exports.save = async (req,res) => {
    console.log("exercisecontroller POST")
    // Save the new model instance, passing a callback
    authhandler._getAuthor(req, res, async function(req, res, userId) {
        let user = await db.User.findById(userId).exec();
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
    });
}   