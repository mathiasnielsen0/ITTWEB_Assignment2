const db = require('../models/db')
let authhandler = require("../AuthHandler");

/* GET list of exercises */
module.exports.get = async function (req, res) {
    authhandler._getAuthor(req, res, async function(req, res, userId) {

        let user = await db.User.findById(userId).exec();
        
        res.status(200);
        res.json({
            "logs" : user.logs
        });
    });
};

//Post 
module.exports.add = async (req,res) => {
    console.log(req.body.workoutId)
    let workoutId = req.body.workoutId;
    let allWorkouts = [];
    authhandler._getAuthor(req, res, async function(req, res, userId) {
        let user = await db.User.findById(userId).exec();
        var log = new db.Log();
        log.createdAt = new Date();


        //find workouts
        db.User.find().then(async (users) => {
            console.log(users.length)
            for(let i = 0; i < users.length; i ++){
                if(users[i].workouts !== undefined){
                    for (let j = 0; j < users[i].workouts.length; j++){
                        allWorkouts.push(users[i].workouts[j]);
                    }
                }
            }


            //console.log(req.body)
            let workout = allWorkouts.find(w => w._id == workoutId);
            log.workout = workout;
            user.logs.push(log);

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

        
    });
}

