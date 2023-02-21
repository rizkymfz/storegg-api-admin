import express from 'express'
import { index, login, logout } from './controller.js'
var router = express.Router();
/* GET home page. */

router.get('/', index);
router.post('/login', login);
router.get('/logout', logout);

export default router;
