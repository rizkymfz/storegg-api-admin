import express from 'express'
import multer from 'multer'
import os from 'os'
import { index, create, store, edit, update, destroy, updateStatus } from './controller.js'
import { isLoginAdmin } from '../middleware/auth.js'

var router = express.Router();
router.use(isLoginAdmin)

/* GET home page. */
router.get('/', index);
router.get('/create', create);
router.post('/store', multer( {dest: os.tmpdir()} ).single('image'), store);
router.get('/edit/:id', edit);
router.put('/update/:id', multer( {dest: os.tmpdir()} ).single('image'), update);
router.delete('/delete/:id', destroy);
router.put('/status/:id', updateStatus);


export default router;
