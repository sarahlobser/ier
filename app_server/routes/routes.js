var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/ctrl');

router.get('/cart/:id', ctrl.addToCart);
router.get('/cart', ctrl.emptyCart);
router.get('/category/:category', ctrl.getCategory);
router.get('/', ctrl.getAll);
router.get('/employee/edit/:id', ctrl.editProduct);
router.get('/employee/:id', ctrl.showEditableProduct);
router.get('/:id', ctrl.show);
router.post('/update/:id', ctrl.update);
//router.get('/Employee/:id', ctrl.showEditableProduct);

module.exports = router;
