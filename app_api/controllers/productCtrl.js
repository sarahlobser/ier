var models = require('../models');

module.exports.index = function(req,res) {
    models.Product.findAll()
        .then(function(products){
            res.send(products);
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
            console.log(product);
            res.send(product);
        })
        .catch(function(err) {
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