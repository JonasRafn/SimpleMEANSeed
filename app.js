var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require("passport");
var passportConfig = require("./config/passport");
passportConfig(passport);

var mongoose = require('mongoose');
var config = require('./config/database');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use('/static', express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/bower_components'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use the passport package
app.use(passport.initialize());

// connect to database
mongoose.connect(config.database);

// pass passport for configuration
require('./config/passport')(passport);

app.use('/api', function (req, res, next) {
    passport.authenticate('jwt', {session: false}, function (err, user, info) {
        if (err) {
            res.status(403).json({success: false, message: "Token could not be authenticated", fullError: err})
        }
        if (user) {
            return next();
        }
        return res.status(403).json({success: false, message: "Token could not be authenticated", fullError: info});
    })(req, res, next);
});


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/api', require('./routes/api'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
