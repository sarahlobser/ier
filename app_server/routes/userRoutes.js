var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/userCtrl');

router.post('/update/:id', userCtrl.update);
router.get('/:id', userCtrl.view);

//router.delete('/delete/:id', userCtrl.delete);

module.exports = router;