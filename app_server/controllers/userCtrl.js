var models = require('../../app_api/models');
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = require('request');
var appURI = "http://localhost:3000/";
if (process.env.PRODUCTION_URL) {
    appURI = process.env.PRODUCTION_URL;
}

module.exports.view = function (req, res) {
    request.get(appURI + 'api/users/' + req.params.id, function (error, response, body) {
        if (!error) {
            console.log("in view profile");
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
    var userToUpdate = JSON.stringify({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.params.id,
            password : req.body.password
        });
    request.put({
        url : appURI + 'api/users/update/',
        headers : {'Content-type' : 'application/json'},
        body : userToUpdate
    }, function(error, response, body) {
        if(!error) {
            res.redirect('/users/' + req.params.id);
        } else {
            console.log(error);
            res.redirect('/products');
        }
    });
};