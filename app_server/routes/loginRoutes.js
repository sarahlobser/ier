var express = require('express');
var router = express.Router();
var loginCtrl = require('../controllers/loginCtrl');

router.get('/', loginCtrl.home);
router.get('/login', loginCtrl.login);
router.post('/authenticate', loginCtrl.authenticate);
router.get('/signup', loginCtrl.signup);
router.post('/register', loginCtrl.register);
router.get('/logout', loginCtrl.logout);

module.exports = router;