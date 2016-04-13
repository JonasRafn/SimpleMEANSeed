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

var helmet = require('helmet');
var session = require('cookie-session');

var seedConfig = require('./config/seedConfig');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/static', express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/bower_components'));
app.use(express.static(path.join(__dirname, 'public/app')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(helmet());

// use the passport package
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'http') {
        var tmp = 'https://' + req.headers.host + req.originalUrl;
        res.redirect(tmp);

    } else {
        return next();
    }
});

app.set('trust proxy', 1);
app.use(session({
        name: seedConfig.configs.cookieName,
        secret: seedConfig.configs.cookieSecret
    })
);

var expiryDate = new Date(Date.now() + seedConfig.configs.sessionExpiration);
app.use(session({
        name: seedConfig.configs.sessionName,
        keys: [seedConfig.configs.sessionKey1, seedConfig.configs.sessionKey2],
        cookie: {
            secure: true, //Ensures the browser only sends the cookie over HTTPS.
            httpOnly: true, //Ensures the cookie is sent only over HTTP(S), not client JavaScript, helping to protect against cross-site scripting attacks.
            domain: seedConfig.configs.sessionDomain, //Indicates the domain of the cookie
            path: seedConfig.configs.sessionPath, //Indicates the path of the cookie
            expires: expiryDate //Used to set expiration date for persistent cookies.
        }
    })
);

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
