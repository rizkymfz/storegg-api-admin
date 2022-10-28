const mongoose = require('mongoose')
let categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'name field is required']
    }
}, { timestamps: true })

module.exports = mongoose.model('Category', categorySchema)