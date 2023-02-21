import Payment from './model.js'
import Bank from '../bank/model.js'

export const index = async (req, res) => {
    try {
        const alertMsg = req.flash("alertMsg")
        const alertStatus = req.flash("alertStatus")
        const alert = { message: alertMsg, status: alertStatus }

        const payment = await Payment.find().populate('banks')
        console.log(payment)
        res.render('admin/payment/index', {
            payment,
            alert
        })
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/payment')
        console.log(err)
    }
}

export const create = async (req, res) => {
    try {
        const alertMsg = req.flash("alertMsg")
        const alertStatus = req.flash("alertStatus")
        const alert = { message: alertMsg, status: alertStatus }

        const banks = await Bank.find()
        res.render('admin/payment/create', { 
            alert,
            banks
        })
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/payment')
        console.log(err)
    }
}

export const store = async (req, res) => {
    try {
        const { type, banks } = req.body

        let payment = await Payment({ type, banks })
        await payment.save()

        req.flash('alertMsg', "Success add payment")
        req.flash('alertStatus', "success")
        res.redirect('/payment')
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('back')
        console.log(err)
    }
}

export const edit = async (req, res) => {
    try {
        const { id } = req.params
        const alertMsg = req.flash("alertMsg")
        const alertStatus = req.flash("alertStatus")
        const alert = { message: alertMsg, status: alertStatus }

        const banks = await Bank.find()
        const payment = await Payment.findOne({_id: id}).populate('banks')

        res.render('admin/payment/edit', {
            payment,
            banks,
            alert
        })
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/payment')
        console.log(err)
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params
        const { type, banks } = req.body

        await Payment.findOneAndUpdate({
            _id: id
        }, { type, banks })

        req.flash('alertMsg', "Success update payment")
        req.flash('alertStatus', "success")
        res.redirect('/payment')

    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('back')
        console.log(err)
    }
}

export const destroy = async (req, res) => {
    try {
        const { id } = req.params
        await Payment.findOneAndRemove({
            _id: id
        })
        
        req.flash('alertMsg', "Success delete payment")
        req.flash('alertStatus', "success")
        res.redirect('/payment')
        
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/payment')
        console.log(err)
    }
}