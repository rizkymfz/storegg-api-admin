var express = require('express');
var router = express.Router();
const multer = require('multer')
const os = require('os')
const { index, create, store, edit, update, destroy, updateStatus } = require('./controller')
const { isLoginAdmin } = require('../middleware/auth')
router.use(isLoginAdmin)

/* GET home page. */
router.get('/', index);
router.get('/create', create);
router.post('/store', multer( {dest: os.tmpdir()} ).single('image'), store);
router.get('/edit/:id', edit);
router.put('/update/:id', multer( {dest: os.tmpdir()} ).single('image'), update);
router.delete('/delete/:id', destroy);
router.put('/status/:id', updateStatus);


module.exports = router;
