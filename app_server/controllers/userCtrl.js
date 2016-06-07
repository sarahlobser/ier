var models = require('../../app_api/models');

var request = require('request');

module.exports.view = function (req, res) {
    request.get('http://localhost:3000/api/users/' + req.params.id, function (error, response, body) {
        if (!error) {
            res.render('profile', {
                user: req.user
                , profile: JSON.parse(body)
            });
        } else {
            res.sendStatus(500);
        }
    })
};

module.exports.update = function (req, res) {
    request.get('http://localhost:3000/api/users/')
}