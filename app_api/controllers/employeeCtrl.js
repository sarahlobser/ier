var models = require('../models');

module.exports.index = function(req,res) {
    models.Employee.findAll()
        .then(function(employees){
            res.send(employees);
        })
        .catch(function(err) {
            console.error(err);
			res.status(500);
			res.send(err);
        });
}

module.exports.show = function(req, res) {
    
    // 'id' is the primary key, which is email
    
    models.Employee.findById(req.params.id)
        .then(function(employee){
            res.send(employee);
        })
        .catch(function(err) {
            console.error(err);
			res.status(500);
			res.send(err);
        });
}