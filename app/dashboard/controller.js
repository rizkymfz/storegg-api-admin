import Transaction from '../transaction/model.js'
import Voucher from '../voucher/model.js'
import Player from '../player/model.js'
import Category from '../category/model.js'

export const index = async (req, res) => {
    try {
        const transaction = await Transaction.countDocuments()
        const voucher = await Voucher.countDocuments()
        const player = await Player.countDocuments()
        const category = await Category.countDocuments()
        res.render('index', {
            name: req.session.user.name,
            title: 'Dashboard',
            count: {
                transaction,
                voucher,
                player,
                category
            }
        })
    } catch (err) {
        console.log(err)
    }
}