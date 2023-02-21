import config from '../../config/index.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Player from '../player/model.js'

export const isLoginAdmin = (req, res, next) => {
    if(req.session.user == null || req.session.user == undefined){
        req.flash('alertMsg', 'Your session has expired, please login to continue')
        req.flash('alertStatus', 'danger')
        res.redirect('/')
    }else{
        next()
    }
}

export const isLoginPlayer = async(req, res, next) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null

        const data = jwt.verify(token, config.jwtKey)
        const player = await Player.findOne({ _id: data.player.id })

        if(!player){
            throw new Error()
        }

        req.player = player
        req.token = token
        next()
    } catch (err) {
        res.status(401).json({
            message: err.message,
            error: "Unauthorized",
        })
    }
}