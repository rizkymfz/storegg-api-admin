import Nominal from './model.js'

export const index = async (req, res) => {
    try {
        const alertMsg = req.flash("alertMsg")
        const alertStatus = req.flash("alertStatus")

        const alert = { message: alertMsg, status: alertStatus }
        const nominal = await Nominal.find()
        res.render('admin/nominal/view_nominal', {
            nominal,
            alert
        })
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/category')
        console.log(err)
    }
}

export const create = async (req, res) => {
    try {
        const alertMsg = req.flash("alertMsg")
        const alertStatus = req.flash("alertStatus")

        const alert = { message: alertMsg, status: alertStatus }

        res.render('admin/nominal/create', { alert })
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/nominal')
        console.log(err)
    }
}

export const store = async (req, res) => {
    try {
        const { coinName, coinQuantity, price } = req.body

        const nominal = await Nominal({ coinName, coinQuantity, price })
        await nominal.save()

        req.flash('alertMsg', "Success add nominal")
        req.flash('alertStatus', "success")
        res.redirect('/nominal')
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

        let nominal = await Nominal.findOne({_id: id})

        res.render('admin/nominal/edit', {
            nominal,
            alert
        })
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/nominal')
        console.log(err)
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params
        const { coinName, coinQuantity, price } = req.body

        await Nominal.findOneAndUpdate({
            _id: id
        }, { coinName, coinQuantity, price })

        req.flash('alertMsg', "Success update nominal")
        req.flash('alertStatus', "success")
        res.redirect('/nominal')

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
        await Nominal.findOneAndRemove({
            _id: id
        })
        
        req.flash('alertMsg', "Success delete nominal")
        req.flash('alertStatus', "success")
        res.redirect('/nominal')
        
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/nominal')
        console.log(err)
    }
}