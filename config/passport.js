var JwtStrategy = require("passport-jwt").Strategy;
ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require("jwt-simple");

var user = require("../app/models/user");
var config = require("../config/database");
var jwtConfig = require("../config/jwtconfig").jwtConfig;

module.exports = function (passport) {
    var opts = {};
    opts.secretOrKey = jwtConfig.secret;
    opts.issuer = jwtConfig.issuer;
    opts.audience = jwtConfig.audience;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        user.findOne({userName: jwt_payload.sub}, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user); //You could choose to return the payLoad instead
            }
            else {
                done(null, false, "user found in token not found");
            }
        })
    }))
};