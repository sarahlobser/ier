var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/productCtrl');

router.get('/cart/:id', productCtrl.addToCart);
router.get('/cart', productCtrl.emptyCart);
router.get('/', productCtrl.index);
router.get('/:id', productCtrl.show);
router.post('/', productCtrl.create);
router.delete('/:id', productCtrl.destroy);
router.put('/:id', productCtrl.update);


module.exports = router;