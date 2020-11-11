var mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const uri = "mongodb+srv://workout_web_assignment:workout_web_assignment@cluster0.i5wkj.azure.mongodb.net/workout_db?retryWrites=true&w=majority";

// these are to remove warnings about things that are to be deprecated
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(uri);
   
var ExerciseSchema = new Schema({
    name: String,
    description: String,
    repetitions: Number,
    sets: Number,
    userExerciseId: String
});

var WorkoutSchema = new Schema({
    name: String,
    exercises: [ExerciseSchema]
})

var UserSchema = new Schema({
    name: { type: String, required: true , unique: true, index: true},
    password: { type: String, required: true },
    exercises: [ExerciseSchema],
    workouts: [WorkoutSchema]
});

module.exports.User = mongoose.model('User', UserSchema);
module.exports.Exercise = mongoose.model('Exercise', ExerciseSchema);
module.exports.Workout = mongoose.model('Workout', WorkoutSchema);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${uri}`);
    
    // Create an instance of model Exercise
    //var exercise = new Exercise({ name: 'Poul' });
    // Save the new model instance, passing a callback
    /*exercise.save(function (err) {
        if (err) return handleError(err);
        // saved!
        console.log("document saved")
    });*/

});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};