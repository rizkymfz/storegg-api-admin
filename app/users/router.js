var express = require('express');
var router = express.Router();
const { index, login, logout } = require('./controller')
/* GET home page. */

router.get('/', index);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
