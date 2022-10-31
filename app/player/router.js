var express = require('express')
var router = express.Router()
const { 
    landingPage, 
    detailPage, 
    payment, 
    category, 
    checkout, 
    history, 
    historyDetail, 
    dashboard, 
    profile,
    updateProfile
} = require('./controller')
const { isLoginPlayer } = require('../middleware/auth')
const multer = require('multer')
const os = require('os')

router.get('/landingpage', landingPage)
router.get('/:id/detail', detailPage)
router.get('/category', category)
router.get('/payment', payment)
router.get('/history', isLoginPlayer, history)
router.get('/history/:id/detail', isLoginPlayer, historyDetail)
router.post('/checkout', isLoginPlayer, checkout)
router.get('/dashboard', isLoginPlayer, dashboard)
router.get('/profile', isLoginPlayer, profile)
router.put('/profile', isLoginPlayer, multer( {dest: os.tmpdir()} ).single('image'), updateProfile)

module.exports = router