import express from 'express'
var router = express.Router();
import { index, create, store, edit, update, destroy } from './controller.js'
import { isLoginAdmin } from '../middleware/auth.js'
router.use(isLoginAdmin)

/* GET home page. */
router.get('/', index);
router.get('/create', create);
router.post('/store', store);
router.get('/edit/:id', edit);
router.put('/update/:id', update);
router.delete('/delete/:id', destroy);


export default router;
