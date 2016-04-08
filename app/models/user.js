var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcryptjs = require('bcryptjs');

//Simple User schema, can add role
var UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//Save user db
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcryptjs.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcryptjs.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

//Compares submitted hashed password with stored hashed password
UserSchema.methods.comparePassword = function (passw, cb) {
    bcryptjs.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);