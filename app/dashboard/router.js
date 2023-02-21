import express from 'express'
import { index } from './controller.js'
import { isLoginAdmin } from '../middleware/auth.js'

var router = express.Router();
/* GET home page. */
router.use(isLoginAdmin)
router.get('/', index);

export default router;
