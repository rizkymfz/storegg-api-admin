import express from 'express'
import { index, updateStatus } from './controller.js'
import { isLoginAdmin } from '../middleware/auth.js'

var router = express.Router();
router.use(isLoginAdmin)

/* GET home page. */
router.get('/', index);
router.put('/status/:id', updateStatus);

export default router;
