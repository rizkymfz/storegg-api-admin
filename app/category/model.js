import mongoose from 'mongoose'

let categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'name field is required']
    }
}, { timestamps: true })

export default mongoose.model('Category', categorySchema)