require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser")

var usersRouter = require('./routes/users');
var workoutRouter = require('./routes/workout');
var exerciseRouter = require('./routes/exercise');
var db = require('./models/db');


var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', usersRouter);
app.use('/workout', workoutRouter);
app.use('/exercise', exerciseRouter);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

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
