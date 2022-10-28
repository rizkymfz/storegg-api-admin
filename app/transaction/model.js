const mongoose = require('mongoose')
let transactionSchema = mongoose.Schema({
    historyVoucherTopup : {
        gameName: { type: String, required: [true, 'field game name is required']},
        category: { type: String, required: [true, 'field category is required']},
        thumbnail: { type: String},
        coinName: { type: String, required: [true, 'field coin name is required']},
        coinQuantity: { type: String, required: [true, 'field coin quantity is required']},
        price: { type: Number }

    },

    historyPayment: {
        name: { type: String, required: [true, 'field name is required']},
        type: { type: String, required: [true, 'payment type is required']},
        bankName: { type: String, required: [true, 'bank name is required']},
        noRekening: { type: String, required: [true, 'no rekening is required']},
    },

    name: {
        type: String,
        required: [true, 'name is required'],
        maxLength: [225, 'minimum length is 3 - 255 char'],
        minLength: [3, 'minimum length is 3 - 255 char'],
    },

    accountUser: {
        type: String,
        required: [true, 'name is required'],
        maxLength: [225, 'minimum length is 3 - 255 char'],
        minLength: [3, 'minimum length is 3 - 255 char'],
    },

    tax: {
        type: Number,
        default: 0
    },

    value: {
        type: Number,
        default: 0,

    },

    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending'
    },

    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Player'
    },

    historyUser: {
        name: { type: String, required: [true, 'name is required']},
        phoneNumber: { 
            type: Number,
            required: [true, 'phone number is required'],
            maxLength: [13, 'minimum length is 9 - 13 char'],
            minLength: [9, 'minimum length is 9 - 13 char'],
        },
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },

    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, { timestamps: true })

module.exports = mongoose.model('Transaction', transactionSchema)