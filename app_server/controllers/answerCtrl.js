var passportConfig = require('../../config/passportConfig');
var models = require('../../app_api/models');
var request = require('request');
//var bcrypt = require('bcrypt');
//const saltRounds = 13;

module.exports.answer = function (req, res) {
    //console.log("in contact");
    res.render('answer');
};
