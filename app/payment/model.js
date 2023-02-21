import mongoose from 'mongoose'
let paymentSchema = mongoose.Schema({
    type: {
        type: String,
        required: [true, 'payment type is required']
    },
    status: {
        type: String,
        enum: ['Y','N'],
        default: 'Y'
    },
    banks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank'
    }],
}, { timestamps: true })

export default mongoose.model('Payment', paymentSchema)