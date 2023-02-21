import express from 'express'
import multer from 'multer'
import os from 'os'
import { signup, signin } from './controller.js'

var router = express.Router()
router.post('/signup',  multer( {dest: os.tmpdir()} ).single('image'), signup)
router.post('/signin', signin)

export default router