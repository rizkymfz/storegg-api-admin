const Bank = require('./model')

module.exports={
    index: async (req, res) => {
        try {
            const alertMsg = req.flash("alertMsg")
            const alertStatus = req.flash("alertStatus")

            const alert = { message: alertMsg, status: alertStatus }
            const bank = await Bank.find()
            res.render('admin/bank/view_bank', {
                bank,
                alert
            })
        } catch (err) {
            req.flash('alertMsg', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            console.log(err)
        }
    },

    create: async (req, res) => {
        try {
            const alertMsg = req.flash("alertMsg")
            const alertStatus = req.flash("alertStatus")

            const alert = { message: alertMsg, status: alertStatus }

            res.render('admin/bank/create', { alert })
        } catch (err) {
            req.flash('alertMsg', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            console.log(err)
        }
    },

    store: async (req, res) => {
        try {
            const { name, bankName, noRekening } = req.body

            let bank = await Bank({ name, bankName, noRekening })
            await bank.save()

            req.flash('alertMsg', "Success add bank")
            req.flash('alertStatus', "success")
            res.redirect('/bank')
        } catch (err) {
            req.flash('alertMsg', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('back')
            console.log(err)
        }
    },

    edit: async (req, res) => {
        try {
            const { id } = req.params
            const alertMsg = req.flash("alertMsg")
            const alertStatus = req.flash("alertStatus")

            const alert = { message: alertMsg, status: alertStatus }

            let bank = await Bank.findOne({_id: id})

            res.render('admin/bank/edit', {
                bank,
                alert
            })
        } catch (err) {
            req.flash('alertMsg', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            console.log(err)
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params
            const { name, bankName, noRekening } = req.body

            await Bank.findOneAndUpdate({
                _id: id
            }, { name, bankName, noRekening })

            req.flash('alertMsg', "Success update bank")
            req.flash('alertStatus', "success")
            res.redirect('/bank')

        } catch (err) {
            req.flash('alertMsg', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('back')
            console.log(err)
        }
    },

    destroy: async (req, res) => {
        try {
            const { id } = req.params
            await Bank.findOneAndRemove({
                _id: id
            })
            
            req.flash('alertMsg', "Success delete bank")
            req.flash('alertStatus', "success")
            res.redirect('/bank')
            
        } catch (err) {
            req.flash('alertMsg', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/bank')
            console.log(err)
        }
    },
}