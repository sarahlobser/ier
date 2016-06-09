var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');

var models = require('../app_api/models');

passport.use(new LocalStrategy(
    {usernameField: 'email',
     passwordField: 'password'},
    function (username, password, callback) {
        models.User.findOne({ // use findOne to return a single User
                where: {
                    email: username
                }
            })
            .then(function (user) {
                if (!user) {
                    return callback(null, false); // no error, but not valid
                }
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err || !result) {
                        return callback(null, false); // no error, passwords don't match
                    }
                    return callback(null, user); // no error, user valid
                })
            })
            .catch(function (err) {
                return callback(err); // error
            });
    }));

passport.serializeUser(function (user, callback) {
    callback(null, user.email);
});

passport.deserializeUser(function (id, callback) {
    models.User.findById(id)
        .then(function (user) {
            callback(null, user);
        })
        .catch(function (err) {
            callback(err);
        });
});

module.exports = passport;