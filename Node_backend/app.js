require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require("body-parser")

var usersRouter = require('./routes/users');
var workoutRouter = require('./routes/workout');
var exerciseRouter = require('./routes/exercise');
var logRouter = require('./routes/log');


var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://pure-oasis-57013.herokuapp.com/');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '*');

  next();
}

var app = express();

// view engine setup
app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join(__dirname, 'public')));
// Serve static files from the Angular frontend app
app.use(express.static(path.join(__dirname, '../angular-frontend/dist/angular-frontend')))


app.use('/user', usersRouter);
app.use('/workout', workoutRouter);
app.use('/exercise', exerciseRouter);
app.use('/log', logRouter);
// AFTER defining routes: Anything that doesn't match what's above, send back index.html;
app.get('*', (req, res) => {
  res.sendFile(path.join('../angular-frontend/dist/angular-frontend/index.html'))
})
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {

  //Unauthorized handling
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
  else{
    res.status(err.status || 500);
    res.json({"message" : err.name + err.message});
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
});

module.exports = app;
