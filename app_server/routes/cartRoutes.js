var express = require('express');
var router = express.Router();
var cartCtrl = require('../controllers/ctrl');

router.get('/', cartCtrl.index);


module.exports = router;
