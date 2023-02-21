import mongoose from 'mongoose'

let userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'name field is required']
    },
    email: {
        type: String,
        require: [true, 'email field is required']
    },
    password: {
        type: String,
        require: [true, 'password field is required']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    phoneNumber: {
        type: String,
        require: [true, 'phone number field is required']
    },
}, { timestamps: true })

export default mongoose.model('User', userSchema)