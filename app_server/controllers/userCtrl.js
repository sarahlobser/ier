var models = require('../../app_api/models');
//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var request = require('request');

module.exports.view = function (req, res) {
    request.get('http://localhost:3000/api/users/' + req.params.id, function (error, response, body) {
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
        url : 'http://localhost:3000/api/users/update/',
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
                

//module.exports.update = function(req, res) {
//	var xhr = new XMLHttpRequest();
//    
//    var jsonString = JSON.stringify(req.body);
//    console.log(jsonString);
//
//	xhr.open('POST', 'http://localhost:3000/api/users/update', true);
//    
//    xhr.setRequestHeader('Content-type', 'application/json');
//
//	xhr.onreadystatechange = function() {
//		if (xhr.readyState === 4 && xhr.status < 400) {
//			console.log(xhr.status);
//            console.log(xhr.responseText);
//			//console.log(data);
//		}
//
//		if (xhr.readyState === 4 && xhr.status >= 400) {
//			console.log(xhr.status);
//			console.log(xhr.responseText);
//		}
//	};
//
//	xhr.send(jsonString);
//};