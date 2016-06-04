var express = require('express');
var router = express.Router();
var employeeCtrl = require('../controllers/employeeCtrl');

router.get('/', employeeCtrl.index);
router.get('/:id', employeeCtrl.show);

module.exports = router;