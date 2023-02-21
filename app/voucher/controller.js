import Voucher from './model.js'
import Category from '../category/model.js'
import Nominal from '../nominal/model.js'
import path from 'path'
import fs from 'fs'
import config from '../../config/index.js'

export const index = async (req, res) => {
    try {
        const alertMsg = req.flash("alertMsg")
        const alertStatus = req.flash("alertStatus")

        const alert = { message: alertMsg, status: alertStatus }
        const voucher = await Voucher.find().populate('category').populate('nominals')
        console.log(voucher)

        res.render('admin/voucher/view_voucher', {
            voucher,
            alert
        })
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/voucher')
        console.log(err)
    }
}

export const create = async (req, res) => {
    try {
        const alertMsg = req.flash("alertMsg")
        const alertStatus = req.flash("alertStatus")
        const category = await Category.find()
        const nominal = await Nominal.find()

        const alert = { message: alertMsg, status: alertStatus }

        res.render('admin/voucher/create', { alert, category, nominal })
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/voucher')
        console.log(err)
    }
}

export const store = async (req, res) => {
    try {
        const { name, category, nominals } = req.body

        if(req.file){
            let tmp_path = req.file.path
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
            let filename = req.file.filename+ '.' + originalExt
            let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)

            src.pipe(dest)
            src.on('end', async ()=>{
                try {
                    const voucher = new Voucher({
                        name,
                        category,
                        nominals,
                        thumbnail: filename
                    })

                    await voucher.save()
                    req.flash('alertMsg', "Success add voucher")
                    req.flash('alertStatus', "success")
                    res.redirect('/voucher')
                } catch (err) {
                    req.flash('alertMsg', `${err.message}`)
                    req.flash('alertStatus', 'danger')
                    res.redirect('back')
                    console.log(err)
                }
            })
        }else{
            const voucher = await Voucher({ name, category, nominals })
            await voucher.save()

            req.flash('alertMsg', "Success add voucher")
            req.flash('alertStatus', "success")
            res.redirect('/voucher')
        }


        
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

        const category = await Category.find()
        const nominal = await Nominal.find()

        let voucher = await Voucher.findOne({_id: id})
            .populate('category')
            .populate('nominals')

        res.render('admin/voucher/edit', {
            voucher,
            category,
            nominal,
            alert
        })
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/voucher')
        console.log(err)
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params
        const { name, category, nominals } = req.body

        if(req.file){
            let tmp_path = req.file.path
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
            let filename = req.file.filename+ '.' + originalExt
            let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)

            src.pipe(dest)
            src.on('end', async ()=>{
                try {

                    const voucher = await Voucher.findOne({_id: id})
                    let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`
                    if(fs.existsSync(currentImage)){
                        fs.unlinkSync(currentImage)
                    }

                    await Voucher.findOneAndUpdate({
                        _id:id
                    },{
                        name,
                        category,
                        nominals,
                        thumbnail: filename
                    });

                    req.flash('alertMsg', "Success update voucher")
                    req.flash('alertStatus', "success")
                    res.redirect('/voucher')
                } catch (err) {
                    req.flash('alertMsg', `${err.message}`)
                    req.flash('alertStatus', 'danger')
                    res.redirect('back')
                    console.log(err)
                }
            })
        }else{
            // console.log("requstan:" +name)
            await Voucher.findOneAndUpdate({
                _id:id
            },{
                name,
                category,
                nominals,
            });

            req.flash('alertMsg', "Success update voucher")
            req.flash('alertStatus', "success")
            res.redirect('/voucher')
        }
        
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
        await Voucher.findOneAndRemove({
            _id: id
        })
        
        req.flash('alertMsg', "Success delete voucher")
        req.flash('alertStatus', "success")
        res.redirect('/voucher')
        
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('/voucher')
        console.log(err)
    }
}

export const updateStatus = async (req, res) => {
    try {
        let voucher = await Voucher.findOne({_id: req.params.id})

        let status = voucher.status === 'Y' ? 'N' : 'Y'
        voucher = await Voucher.findOneAndUpdate({
            _id:req.params.id
        }, {status} )

        req.flash('alertMsg', "Status updated")
        req.flash('alertStatus', "success")
        res.redirect('back')
    } catch (err) {
        req.flash('alertMsg', `${err.message}`)
        req.flash('alertStatus', 'danger')
        res.redirect('back')
        console.log(err)
    }
}