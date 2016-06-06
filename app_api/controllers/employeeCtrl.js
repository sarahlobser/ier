var models = require('../models');
var bcrypt = require('bcrypt');
const saltRound = 13;

module.exports.index = function (req, res) {
    models.Employee.findAll()
        .then(function (employees) {
            //res.send(employees);
            res.render('employees', {employees:employees});
        })
        .catch(function (err) {
            console.error(err);
            res.status(500);
            res.send(err);
        });
}

// Find Employee by 'id' which is primary key (email)
module.exports.show = function (req, res) {
    models.Employee.findById(req.params.id)
        .then(function (employee) {
            //res.send(employee);
            res.render('employees', {employee:employee});
        })
        .catch(function (err) {
            console.error(err);
            res.status(500);
            res.send(err);
        });
};

// Create Employee
module.exports.create = function (req, res) {
    var employee = req.body;
    var rawPassword = user.password;
    console.log(user.email);

    bcrypt.hash(rawPassword, saltRounds, function (err, hash) {
        models.User.create({
                email: employee.email
                , password: hash
            })
            .then(function (employee) {
                res.sendStatus(201);
            })
            .catch(function (err) {
                res.status(500);
                res.send('InternalServerError: User not created');
            });

    });
};

// Delete Employee
module.exports.destroy = function (req, res) {
    var id = req.params.id;
    models.Employee.destroy({
            where: {
                id: id
            }
        })
        .then(function () {
            res.sendStatus(202);
        })
        .catch(function (err) {
            res.status(500);
            res.send(err);
        })
};

//Update Employee
module.exports.update = function (req, res) {
    var updatedEmployee = req.body;
    models.Employee.upsert(updatedEmployee)
        .then(function () {
            res.sendStatus(202);
        });
};