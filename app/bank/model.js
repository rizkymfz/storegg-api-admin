import mongoose from 'mongoose'

let bankSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'name field is required']
    },
    bankName: {
        type: String,
        require: [true, 'bank name field is required']
    },
    noRekening: {
        type: String,
        require: [true, 'no rekening field is required']
    },
}, { timestamps: true })

export default mongoose.model('Bank', bankSchema)