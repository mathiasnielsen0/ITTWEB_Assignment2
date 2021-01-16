const db = require('../models/db')
let authhandler = require("../AuthHandler");

/* GET list of exercises */
module.exports.listExercises = async function (req, res) {
    let exercises = [];

    db.User.find().then((users) => {
        for(let i = 0; i < users.length; i ++){
            if(users[i].exercises !== undefined){
                for (let j = 0; j < users[i].exercises.length; j++){
                    exercises.push(users[i].exercises[j]);
                }
            }
        }
    
        console.log(exercises);
        res.status(200);
        res.json({
            "exercises" : exercises
        });
    });
};

//Post 
module.exports.addExercise = async (req,res) => {

    authhandler._getAuthor(req, res, async function(req, res, userId) {
        let user = await db.User.findById(userId).exec();
        var exercise = new db.Exercise();
        console.log(req)
        exercise.name = req.body.name;
        exercise.description = req.body.description;
        exercise.repetitions = req.body.repetitions;
        exercise.sets = req.body.sets;
        
        user.exercises.push(exercise);

        // Save the new model instance, passing a callback 
        try {
            await user.save();
            res.status(201);
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
    console.log(req.params.id);
    let exercises = [];

    db.User.find().then((users) => {
        for(let i = 0; i < users.length; i ++){
            if(users[i].exercises !== undefined){
                for (let j = 0; j < users[i].exercises.length; j++){
                    exercises.push(users[i].exercises[j]);
                }
            }
        }

        let exercise = exercises.find(e => e._id == req.params.id);


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