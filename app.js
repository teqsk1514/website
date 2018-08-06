var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var expressValidator = require('express-validator')
var expressSession = require('express-session');

var routes = require('./routes/index');

var app = express();

//connecting to mlab.

mongoose.connect('mongodb://teqsk1514:iamravi14@ds211592.mlab.com:11592/userdata', { useNewUrlParser: true },()=>{
 console.log('connected to mongodb');
 });

//create engine
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); //setup the express validator
app.use(expressSession({secret:'max',saveUninitialized:false ,resave :false})) // false means we change the session if we change something
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/images')); 

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
