var express = require('express');
var router = express.Router();
const { index, create, store, edit, update, destroy } = require('./controller')
const { isLoginAdmin } = require('../middleware/auth')
router.use(isLoginAdmin)
/* GET home page. */
router.get('/', index);
router.get('/create', create);
router.post('/store', store);
router.get('/edit/:id', edit);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);


module.exports = router;
