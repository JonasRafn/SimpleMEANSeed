var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var jwtConfig = require("../config/jwtconfig").jwtConfig;
var passport = require('passport');
var User = require('../app/models/user');

// User singup (POST localhost:3000/users/signup)
router.post('/signup', function (req, res) {
    if (!req.body.userName || !req.body.password) {
        res.status(200).json({success: false, msg: 'Please pass userName and password in the body.'});
    } else {
        var newUser = new User({
            userName: req.body.userName,
            password: req.body.password
        });
        // save the user
        newUser.save(function (err) {
            if (err) {
                return res.status(409).json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successfully created new user.'});
        });
    }
});

// User authenticate (POST localhost:3000/users/authenticate)
router.post('/authenticate', function (req, res) {
    User.findOne({
        userName: req.body.userName
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var iat = new Date().getTime() / 1000; //convert to seconds
                    var exp = iat + jwtConfig.tokenExpirationTime;
                    var payload = {
                        aud: jwtConfig.audience,
                        iss: jwtConfig.issuer,
                        iat: iat,
                        exp: exp,
                        sub: user.userName
                    };
                    var token = jwt.encode(payload, jwtConfig.secret);
                    // return the information including token as JSON
                    res.status(200).json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

module.exports = router;
