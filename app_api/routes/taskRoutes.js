var express = require('express');
var router = express.Router();
var taskCtrl = require('../controllers/taskCtrl');

router.get('/:uid/tasks', taskCtrl.index);
router.get('/:uid/tasks/:tid', taskCtrl.show);
router.post('/:uid/tasks', taskCtrl.create);
router.put('/:uid/tasks/:tid', taskCtrl.update);
router.delete('/:uid/tasks/:tid', taskCtrl.destroy);

module.exports = router;
