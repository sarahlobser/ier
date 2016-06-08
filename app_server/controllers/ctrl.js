//var models = require('../models');
var models = require('../../app_api/models');

var request = require('request');

module.exports.getAll = function (req, res) {
    request.get('http://localhost:3000/api/products/', function (error, response, body) {
        if (!error) {
            res.render('products', {
                user: req.user
                , products: JSON.parse(body)
            });
        } else {
            res.sendStatus(500);
        }
    })
};

module.exports.show = function (req, res) {
    request.get('http://localhost:3000/api/products/' + req.params.id, function (error, response, body) {
        if (!error) {
            res.render('product', {
                user: req.user
                , product: JSON.parse(body)
            });
        } else {
            res.sendStatus(500);
        }
    })
};

module.exports.getCategory = function (req, res) {
    request.get('http://localhost:3000/api/products/category/' + req.params.category, function (error, response, body) {
        if (!error) {
            res.render('products', {
                user: req.user
                , products: JSON.parse(body)
            });
        } else {
            res.sendStatus(500);
        }
    })
}

module.exports.showEditableProduct = function (req, res) {
    request.get('http://localhost:3000/api/products/' + req.params.id, function (error, response, body) {
        if (!error) {
            res.render('employeeProduct', {
                user: req.user
                , product: JSON.parse(body)
            });
        } else {
            res.sendStatus(500);
        }
    })
}

module.exports.addToCart = function (req, res) {
    var product = models.Product.findById(req.params.id)
        .then(function (product) {
            console.log("HELLO")
            var cart = [];
            if (req.signedCookies.cart) {
                cart = req.signedCookies.cart;
                cart.push(product);
                res.cookie('cart', cart, {
                    signed: true
                });
                res.render('cart', {
                    user: req.user
                    , cart : cart
                });
            } else {
                cart.push(product);
                res.cookie('cart', cart, {
                    signed: true
                });
                res.render('cart', {
                    user: req.user
                    , cart : cart
                });
            }
        });
};

module.exports.emptyCart = function (req, res) {
    if (req.signedCookies.cart) {
        var cart = req.signedCookies.cart;
        console.log("cart has " + cart.length + " it");
        while (cart.length > 0) {
            cart.pop();
        }

    }
    res.clearCookie('cart');
    res.render('cart', {message : "Your cart is empty"});
};

 module.exports.editProduct = function (req, res) {
     request.get('http://localhost:3000/api/products/' + req.params.id, function (error, response, body) {
         if (!error) {
             res.render('editProduct', {
                 user: req.user
                 , product: JSON.parse(body)
             });
         } else {
             res.sendStatus(500);
         }
     })
 };

 module.exports.update = function (req, res) {
   console.log(req.body);
     var productToUpdate = JSON.stringify({
             id : req.params.id,
             category : req.body.category,
             price : Number(req.body.price),
             description : req.body.description,
             rating : Number(req.body.rating),
             brand : req.body.brand,
             name : req.body.name,
             quantity : Number(req.body.quantity)

         });
        console.log(productToUpdate);
     request.put({
         url : 'http://localhost:3000/api/products/' + req.params.id,
         headers : {'Content-type' : 'application/json'},
         body : productToUpdate
     }, function(error, response, body) {
         if(!error) {
             res.redirect('/products/' + req.params.id);
         } else {
             console.log(error);
             res.redirect('/products');
         }
     });
 };
