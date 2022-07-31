const Router = require('express');
const router = new Router();
const folderRouter = require('./foldersRouter');

router.use('/folder',folderRouter);

module.exports = router;