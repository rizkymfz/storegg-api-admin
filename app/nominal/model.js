import mongoose from 'mongoose'

let nominalSchema = mongoose.Schema({
    coinQuantity: {
        type: Number,
        default:0
    },
    coinName: {
        type: String,
        require: [true, 'Coin name is required']
    },
    price: {
        type: Number,
        default:0
    },
}, { timestamps: true })

export default mongoose.model('Nominal', nominalSchema)