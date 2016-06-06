//var models = require('../models');
var models = require('../../app_api/models');

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

module.exports.addToCart = function(req, res) {
    var product = models.Product.findById(req.params.id)
        .then(function(product) {
            var cart = [];
            if(req.signedCookies.cart) {
                cart = req.signedCookies.cart;
                cart.push(product);
                res.cookie('cart', cart, {signed:true});
                res.render('products', {cartitems:cart});
            } else {
                cart.push(product);
                res.cookie('cart', cart, {signed:true});
                res.render('products', {cartitems:cart});
            }
        });
};

module.exports.emptyCart = function(req, res) {
    console.log("in empty cart");
    if(req.signedCookies.cart) {
        //cart = [];
        var cart = req.signedCookies.cart;
        console.log("cart has " + cart.length + " it");
        while(cart.length > 0) {
            cart.pop();
        }
        
    }
    res.clearCookie('cart');
    res.send('Cart has been emptied...sucka');
};

