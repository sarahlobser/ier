var models = require('../models');
var bcrypt = require('bcrypt');
const saltRounds = 13;

module.exports.index = function(req,res){
	models.User.findAll()
		.then(function(users){
			res.send(users);
		})
		.catch(function(err){
			console.error(err);
			res.status(500);
			res.send(err);
		});
};

module.exports.show = function(req,res){
	models.User.findById(req.params.id)
		.then(function(user){
			res.send(user);
		})
};

module.exports.create = function(req,res) {
	var user = req.body;
    var rawPassword = user.password;
    console.log(user.email);

    bcrypt.hash(rawPassword, saltRounds, function(err,hash){
        models.User.create({
            email : user.email,
            password : hash
        })
            .then(function(user) {
                res.sendStatus(201);
            })
            .catch(function(err) {
                res.status(500);
                res.send('InternalServerError: User not created');
            }); 

    });
    // var user = req.body;
    // models.User.create(user)
    //     .then(function(users){
    //         res.sendStatus(201);
    //     })
    //     .catch(function(err){
    //     	res.status(500);
    //     	res.send(err);
    //     });
};

module.exports.destroy = function(req,res){
	var id = req.params.id;
	models.User.destroy({
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
    var updatedUser = req.body;
    models.User.upsert(updatedUser)
        .then(function(){
            res.sendStatus(202);
        });
};








