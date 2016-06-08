var models = require('../models');
var bcrypt = require('bcrypt');
const saltRounds = 13;

module.exports.index = function (req, res) {
    models.User.findAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            console.error(err);
            res.status(500);
            res.send(err);
        });
};

module.exports.show = function (req, res) {
    models.User.findById(req.params.id)
        .then(function (user) {
            res.send(user);
        })
};

module.exports.create = function (req, res) {
    var user = req.body;
    var rawPassword = user.password;
    console.log(user.email);

    bcrypt.hash(rawPassword, saltRounds, function (err, hash) {
        models.User.create({
                email: user.email
                , password: hash
                , first_name: user.first_name
                , last_name: user.last_name
            })
            .then(function (user) {
                res.sendStatus(201);
            })
            .catch(function (err) {
                res.status(500);
                res.send('InternalServerError: User not created');
            });

    });
};

module.exports.destroy = function (req, res) {
    var id = req.params.id;
    models.User.destroy({
            where: {
                id: id
            }
        })
        .then(function () {
            res.sendStatus(202);
        })
        .catch(function (err) {
            res.status(500);
            res.send(err);
        })
};

module.exports.update = function (req, res) {
    var updatedUser = req.body;
    console.log(req.body);
    console.log(updatedUser.email + " " + updatedUser.password + " is the updated user in api");
    bcrypt.hash(updatedUser.password, saltRounds, function (err, hash) {
        models.User.upsert({
                email: updatedUser.email
                , password: hash
                , first_name: updatedUser.first_name
                , last_name: updatedUser.last_name
            })
            .then(function (bool) {
                console.log(bool);
                res.sendStatus(202);
            });
    });
}