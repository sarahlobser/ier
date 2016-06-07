var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');

router.get('/:id', userCtrl.view);
//router.put('/update/:id', userCtrl.update);
//router.delete('/delete/:id', userCtrl.delete);

module.exports = router;