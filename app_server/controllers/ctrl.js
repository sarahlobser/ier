//var models = require('../models');

var request = require('request');

module.exports.getAll = function(req, res) {
    request.get('http://localhost:3000/api/products/', function(error, response, body){
        if(!error) {
            res.render('products', {products: JSON.parse(body)});
        } else {
            res.sendStatus(500);
        }
    })
};

module.exports.show = function(req, res) {
    request.get('http://localhost:3000/api/products/' + req.params.id, function(error, response, body){
        if(!error) {
            res.render('products', {product: JSON.parse(body)});
        } else {
            res.sendStatus(500);
        }
    })
}

