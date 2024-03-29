import Player from './model.js'
import Voucher from '../voucher/model.js'
import Nominal from '../nominal/model.js'
import Bank from '../bank/model.js'
import Payment from '../payment/model.js'
import Category from '../category/model.js'
import Transaction from '../transaction/model.js'
import path from 'path'
import fs from 'fs'
import config from '../../config/index.js'

export const landingPage = async( req, res ) => {
    try {
        const voucher = await Voucher.find()
            .select('_id name status category thumbnail')
            .populate('category')

        res.status(200).json({ data:voucher })
    } catch (err) {
        res.status(500).json({message:err.message || 'Server error'})
    }
}

export const detailPage = async( req, res ) => {
    try {
        const voucher = await Voucher.findOne({ _id: req.params.id })
            .populate('category')
            .populate('nominals')
            .populate('user', '_id name phoneNumber')

        if(!voucher) {
            res.status(200).json({ message: 'data not found.!' })
        }

        res.status(200).json({ data:voucher })
    } catch (err) {
        res.status(500).json({message:err.message || 'Server error'})
    }
}

export const getPayment = async (req, res) => {
    const payment = await Payment.find()
    .populate('banks')

    res.status(200).json({ data:payment })
}

export const category = async(req, res)=> {
    try {
        const category = await Category.find()

        res.status(200).json({ data:category })
    } catch (err) {
        res.status(500).json({message:err.message || 'Server error'})
    }
}

export const checkout = async (req, res) => {
    try {
        const { accountUser, name, nominal, voucher, payment, bank } = req.body

        const res_voucher = await Voucher.findOne({_id : voucher})
            .select('name category _id thumbnail user')
            .populate('category')
            .populate('user')
        if(!res_voucher) return res.status(200).json({ message : 'voucher not found' })

        const res_nominal = await Nominal.findOne({_id : nominal})
        
        if(!res_nominal) return res.status(200).json({ message : 'nominal not found' })

        const res_payment = await Payment.findOne({_id : payment})
        if(!res_payment) return res.status(200).json({ message : 'payment not found' })

        const res_bank = await Bank.findOne({_id : bank})
        if(!res_bank) return res.status(200).json({ message : 'bank not found' })

        let tax = (10 / 100) * res_nominal._doc.price;
        let value =  res_nominal._doc.price - tax;

        const payload = {
            historyVoucherTopup : {
                gameName: res_voucher._doc.name,
                category: res_voucher._doc.category ? res_voucher._doc.category.name : '',
                thumbnail: res_voucher._doc.thumbnail,
                coinName: res_nominal._doc.coinName,
                coinQuantity: res_nominal._doc.coinQuantity,
                price: res_nominal._doc.price,
        
            },
            historyPayment: {
                name: res_bank._doc.name,
                type: res_payment._doc.type,
                bankName: res_bank._doc.bankName,
                noRekening: res_bank._doc.noRekening,
            },

            name : name,
            accountUser : accountUser,
            tax : tax,
            value : value,
            player : req.player._id,
            historyUser: {
                name: res_voucher._doc.user?.name,
                phoneNumber: res_voucher._doc.user?.phoneNumber,
            },

            category : res_voucher._doc.category?._id,
            user : res_voucher._doc.user?._id,
        }

        const transaction = new Transaction(payload)
        await transaction.save()

        res.status(201).json({ 
            data: transaction 
        })
    } catch (err) {
        res.status(500).json({message:err.message || 'Server error'})
    }
}

export const history = async(req, res) => {
    try {
        const { status = '' } = req.query

        let criteria = {}
        if(status.length){
            criteria = {
                ...criteria,
                status: { $regex : `${status}`, $options: 'i' }
            }
        }

        if(req.player._id){
            criteria = {
                ...criteria,
                player : req.player._id
            }
        }

        const history = await Transaction.find(criteria)
        let total
        if(history.length){
            total = await Transaction.aggregate([
                {$match : criteria},
                {
                    $group:{
                        _id:null,
                        value: {$sum : "$value"}
                    }
                }
            ])
        }
        res.status(200).json({
            data : history,
            total: total ? total[0].value : 0
        })
    } catch (err) {
        res.status(500).json({message:err.message || 'Server error'})
    }
}

export const historyDetail = async (req, res) => {
    try {
        const history = await Transaction.findOne({_id:req.params.id})
        res.status(200).json({
            data : history,
        })
    } catch (err) {
        res.status(500).json({message:err.message || 'Server error'})
    }
}

export const dashboard = async (req, res) => {
    try {
        const count = await Transaction.aggregate([
                {$match : {player: req.player._id} },
                {
                    $group:{
                        _id:'$category',
                        value: {$sum : "$value"}
                    }
                }
        ])
        const category = await Category.find()
        category.forEach(element =>{
            count.forEach(data => {
                if(data._id.toString() === element._id.toString()){
                    data.name = element.name
                }
            })
        })

        const history = await Transaction.find({ player: req.player._id })
            .populate('category')
            .sort({ 'updated_at': -1 })

        res.status(200).json({
            data : history,
            count: count
        })
    } catch (err) {
        res.status(500).json({message:err.message || 'Server error'})
    }
}

export const profile = async(req,res) => {
    try {
        res.status(200).json({
            data : req.player
        })
    } catch (err) {
        res.status(500).json({message:err.message || 'Server error'})
    }
}

export const updateProfile = async(req, res, next) => {
    try {
        const { name= "", phoneNumber= "" } = req.body
        const payload = {}

        if(name.length) payload.name = name
        if(phoneNumber.length) payload.phoneNumber = phoneNumber

        if(req.file){
            let tmp_path = req.file.path
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1]
            let filename = req.file.filename+ '.' + originalExt
            let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

            const src = fs.createReadStream(tmp_path)
            const dest = fs.createWriteStream(target_path)

            src.pipe(dest)
            src.on('end', async ()=>{

                let player = await Player.findOne({_id: req.player._id})
                let currentImage = `${config.rootPath}/public/uploads/${player.avatar}`
                if(fs.existsSync(currentImage)){
                    fs.unlinkSync(currentImage)
                }

                player =  await Player.findOneAndUpdate({
                    _id:req.player._id
                },{
                    ...payload,
                    avatar: filename
                })
                
                res.status(200).json({
                    data : {
                        id : player.id,
                        name : player.name,
                        phoneNumber : player.phoneNumber,
                        avatar : player.avatar,
                    }
                })
            })

        }else{
            const player = await Player.findOneAndUpdate({
                _id:req.player._id
            }, payload, { new: true, runValidators: true })
            res.status(200).json({
                data : {
                    id : player.id,
                    name : player.name,
                    phoneNumber : player.phoneNumber,
                    avatar : player.avatar,
                }
            })
        }

    } catch (err) {
        res.status(500).json({message:err.message || 'Server error'})
    }
}
