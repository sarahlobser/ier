var models = require('../models');

module.exports.index = function(req,res) {
    models.Product.findAll()
        .then(function(products){
            console.log(products);
            res.send(products);
        })
        .catch(function(err) {
            console.error(err);
			res.status(500);
			res.send(err);
        });
}

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
}