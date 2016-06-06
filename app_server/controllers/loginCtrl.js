var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');
var bcrypt = require('bcrypt');
const saltRounds = 13;

module.exports.home = function (req, res) {
    res.render('index', {
        username: req.session.username
    });
};

module.exports.login = function (req, res) {
    res.render('login');
};

module.exports.authenticate = function (req, res) {
    console.log(req.body);

    passportConfig.authenticate('local', function (err, user, info) {
        if (err || !user) {
            return res.redirect('/login');
        }
        req.login(user, function (err) {
            req.session.username = user.email;
            return res.redirect('/');
        })
    })(req, res);
};
// EMPLOYEE AUTHENTICATION TABLE
//module.exports.authenticate = function (req, res) {
//    console.log(req.body);
//    passportConfig.authenticate('local', function (err, employee, info) {
//        if (err || !employee) {
//            return res.redirect('/login');
//        }
//        req.login(user, function (err) {
//            return res.redirect('/');
//        })
//    })(req, res);
//};

module.exports.signup = function (req, res) {
    res.render('signup');
};

module.exports.register = function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        models.User.create({
                email: req.body.email
                , password: hash
            })
            .then(function (user) {
                console.log(req.body.email);
                req.login(user, function (err) {
                    req.session.username = user.email;
                    return res.render('index', {
                        user: user
                    });
                })
            });
    });
};

module.exports.logout = function (req, res) {
    req.logout();
    res.redirect('/login');
}