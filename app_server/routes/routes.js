var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/ctrl');

router.get('/cart/:id', ctrl.addToCart);
router.get('/cart', ctrl.emptyCart);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.show);

module.exports = router;