var models = require('../models');

module.exports.index = function(req,res){
	models.User.findById(req.params.uid)
		.then(function(user){
			user.getTasks()
				.then(function(tasks){
					res.json(tasks);
				})
		})
};
module.exports.show = function(req,res){
	models.Task.findById(req.params.tid)
		.then(function(task){
			res.json(task);
		});
};
module.exports.create = function(req,res){
	models.Task.create({
		title : req.body.title,
		UserId : req.params.uid
	})
		.then(function(task){
			models.User.findById(req.params.uid)
				.then(function(user){
					user.addTask(task)
						.then(function(){
							res.sendStatus(201);
						});
				});
		});
};
module.exports.update = function(req,res){
	models.Task.upsert({
		id : req.params.tid,
		title : req.body.title,
		UserId : req.params.uid
	})
		.then(function(task){
			res.sendStatus(202);
		})
};
module.exports.destroy = function(req,res){
	models.Task.destroy({
		where: {
			id : req.params.tid
		}
	})
		.then(function(){
			res.sendStatus(202);
		})
};