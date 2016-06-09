var express = require('express');
var router = express.Router();
var answerCtrl = require('../controllers/answerCtrl');

router.get('/', answerCtrl.answer);

module.exports = router;
