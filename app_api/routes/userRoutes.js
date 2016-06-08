// userRoutes.js

var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');

router.put('/update', userCtrl.update);
router.delete('/:id', userCtrl.destroy);
router.get('/:id', userCtrl.show);
router.get('/', userCtrl.index);
router.post('/', userCtrl.create);



module.exports = router;