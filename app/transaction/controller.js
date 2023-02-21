import Transaction from './model.js'


export const index = async (req, res) => {
    try {
        const alertMsg = req.flash("alertMsg")
        const alertStatus = req.flash("alertStatus")
        const alert = { message: alertMsg, status: alertStatus }

        const transaction = await Transaction.find()
                                    // .populate('player')
        console.log(transaction)
        res.render('admin/transaction/index', {
            transaction,
            alert
        })
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/transaction')
        console.log(err)
    }
}

export const updateStatus = async(req, res) => {
    try {
        const { status } = req.query

        await Transaction.findByIdAndUpdate({_id:req.params.id}, {status: status})
        req.flash('alertMsg', 'status updated')
        req.flash('alertStatus', 'success')
        res.redirect('back')
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/transaction')
        console.log(err)
    }
}
