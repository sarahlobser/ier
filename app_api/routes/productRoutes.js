var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/productCtrl');

router.get('/', productCtrl.index);
router.get('/:id', productCtrl.show);

module.exports = router;