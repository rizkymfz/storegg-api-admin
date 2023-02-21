import User from './model.js'
import bcrypt from 'bcryptjs'

export const index = async (req, res) => {
    try {
        const alertMsg = req.flash("alertMsg")
        const alertStatus = req.flash("alertStatus")
        const alert = { message: alertMsg, status: alertStatus }
        if(req.session.user == null || req.session.user == undefined){
            res.render('admin/users/sign-in', {
                alert
            })
        }else{
            res.redirect('/dashboard')
        }
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('back')
        console.log(err)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })

        if(user){
            if(user.status === 'Y'){
                const checkPwd = await bcrypt.compare(password, user.password)
                if(checkPwd){
                    req.session.user = {
                        id : user._id,
                        email : user.email,
                        status : user.status,
                        name : user.name
                    }
                    res.redirect('/dashboard')
                }else{
                    req.flash('alertMsg', 'wrong password')
                    req.flash('alertStatus', 'danger')
                    res.redirect('back')
                }
            }else{
                req.flash('alertMsg', 'Failed, your status is not active')
                req.flash('alertStatus', 'danger')
                res.redirect('back')
            }
        }else{
            req.flash('alertMsg', 'User email not found')
            req.flash('alertStatus', 'danger')
            res.redirect('back')
        }
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('back')
        console.log(err)
    }
}

export const logout = async(req,res) => {
    req.session.destroy()
    res.redirect('/')
}