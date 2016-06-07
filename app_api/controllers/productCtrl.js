var models = require('../models');

module.exports.index = function(req,res) {
    models.Product.findAll()
        .then(function(products){
            res.json(products);
//            res.render('products', {products:products});
        })
        .catch(function(err) {
            console.error(err);
			res.status(500);
			res.send(err);
        });
};

module.exports.show = function(req, res) {
    console.log(req.params.id);
    models.Product.findById(req.params.id)
        .then(function(product){
            res.json(product);
//            res.render('products', {product:product})
        })
        .catch(function(err) {
            console.error(err);
			res.status(500);
			res.send(err);
        });
};

module.exports.showCategory = function(req, res) {
    console.log("in show category method");
    var cat = req.params.category;
    models.Product.findAll({
        where : {
            category : cat
        }
    })
    .then(function(products){
        res.json(products);
    })
    .catch(function(err){
        console.error(err);
        res.status(500);
        res.send(err);
    });
};

module.exports.create = function(req,res) {
    var product = req.body;
    models.Product.create(product)
        .then(function(products){
            res.sendStatus(201);
        })
        .catch(function(err){
            res.status(500);
            res.send(err);
        });
};

module.exports.destroy = function(req,res){
    var id = req.params.id;
    models.Product.destroy({
        where : {
            id : id
        }
    })
    .then(function(){
        res.sendStatus(202);
    })
    .catch(function(err){
        res.status(500);
        res.send(err);
    })
};

module.exports.update = function(req,res){
    var updatedProduct = req.body;
    models.Product.upsert(updatedProduct)
        .then(function(){
            res.sendStatus(202);
        });
};

//module.exports.addToCart = function(req, res) {
//    var product = models.Product.findById(req.params.id)
//        .then(function(product) {
//            var cart = [];
//            if(req.signedCookies.cart) {
//                cart = req.signedCookies.cart;
//                cart.push(product);
//                res.cookie('cart', cart, {signed:true});
//                res.render('products', {cartitems:cart});
//            } else {
//                cart.push(product);
//                res.cookie('cart', cart, {signed:true});
//                res.render('products', {cartitems:cart});
//            }
//        });
//};
//
//module.exports.emptyCart = function(req, res) {
//    console.log("in empty cart");
//    if(req.signedCookies.cart) {
//        cart = req.signedCookies.cart;
//        console.log("cart has " + cart.length + " it");
//        while(cart.length > 0) {
//            cart.pop();
//        }
//    }
//    res.clearCookie('cart');
//    res.send('Cart has been emptied...sucka');
//};
