const Router = require('express');
const router = new Router();
const folderController = require('../controllers/folderController');

router.get('/current',folderController.getCurrent);
router.get('/',folderController.getAll);
router.post('/',folderController.create);
router.delete('/',folderController.deleteFolder);

module.exports = router;