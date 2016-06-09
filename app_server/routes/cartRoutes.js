var express = require('express');
var router = express.Router();
var cartCtrl = require('../controllers/cartCtrl');

router.get('/checkout', cartCtrl.checkout);
router.get('/', cartCtrl.index);
router.get('/:id', cartCtrl.removeProduct);


module.exports = router;
