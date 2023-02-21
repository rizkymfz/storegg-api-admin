import express from 'express'
var router = express.Router()
import { 
    landingPage, 
    detailPage, 
    getPayment, 
    category, 
    checkout, 
    history, 
    historyDetail, 
    dashboard, 
    profile,
    updateProfile
} from './controller.js'
import { isLoginPlayer } from '../middleware/auth.js'
import multer from 'multer'
import os from 'os'

router.get('/landingpage', landingPage)
router.get('/:id/detail', detailPage)
router.get('/category', category)
router.get('/payment', getPayment)
router.get('/history', isLoginPlayer, history)
router.get('/history/:id/detail', isLoginPlayer, historyDetail)
router.post('/checkout', isLoginPlayer, checkout)
router.get('/dashboard', isLoginPlayer, dashboard)
router.get('/profile', isLoginPlayer, profile)
router.put('/profile', isLoginPlayer, multer( {dest: os.tmpdir()} ).single('image'), updateProfile)

export default router