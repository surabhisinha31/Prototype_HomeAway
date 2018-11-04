const express = require('express');
const path = require('path');
var session = require('express-session');
var expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');
var cors = require('cors');
const PORT = 3001;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var app = express();
var passport = require('passport');


var users = require('./routes/users');
var search = require('./routes/search');
var booking = require('./routes/booking');
var uploadproperty = require('./routes/uploadproperty');
var dashboard= require('./routes/dashboard');
var getpropertyimages=require('./routes/getpropertyimages');
var travelerOwnerEmail=require('./routes/travelerOwnerEmail');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


app.use(passport.initialize());
app.use('/users', users);
app.use('/search', search);
app.use('/booking', booking);
app.use('/dashboard', dashboard);
app.use('/uploadproperty', uploadproperty);
app.use('/getpropertyimages',getpropertyimages);
app.use('/travelerOwnerEmail',travelerOwnerEmail);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
