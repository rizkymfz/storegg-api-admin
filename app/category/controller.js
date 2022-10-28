const Category = require('./model')

module.exports={
    index: async (req, res) => {
        try {
            const alertMsg = req.flash("alertMsg")
            const alertStatus = req.flash("alertStatus")

            const alert = { message: alertMsg, status: alertStatus }
            const category = await Category.find()
            res.render('admin/category/view_category', {
                category,
                alert
            })
        } catch (err) {
            req.flash('alertMsg', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
            console.log(err)
        }
    },

    create: async (req, res) => {
        try {
            const alertMsg = req.flash("alertMsg")
            const alertStatus = req.flash("alertStatus")

            const alert = { message: alertMsg, status: alertStatus }

            res.render('admin/category/create', { alert })
        } catch (err) {
            req.flash('alertMsg', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
            console.log(err)
        }
    },

    store: async (req, res) => {
        try {
            const { name } = req.body

            let category = await Category({ name })
            await category.save()

            req.flash('alertMsg', "Success add category")
            req.flash('alertStatus', "success")
            res.redirect('/category')
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

            let category = await Category.findOne({_id: id})

            res.render('admin/category/edit', {
                category,
                alert
            })
        } catch (err) {
            req.flash('alertMsg', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
            console.log(err)
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params
            const { name } = req.body

            await Category.findOneAndUpdate({
                _id: id
            }, {name: name})

            req.flash('alertMsg', "Success update category")
            req.flash('alertStatus', "success")
            res.redirect('/category')

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
            await Category.findOneAndRemove({
                _id: id
            })
            
            req.flash('alertMsg', "Success delete category")
            req.flash('alertStatus', "success")
            res.redirect('/category')
            
        } catch (err) {
            req.flash('alertMsg', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/category')
            console.log(err)
        }
    },
}