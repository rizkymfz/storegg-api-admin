import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const HASH_ROUND = 10

let playerSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'name field is required'],
        maxLength: [225, 'minimum length is 3 - 255 char'],
        minLength: [3, 'minimum length is 3 - 255 char']
    },
    username: {
        type: String,
        require: [true, 'username field is required'],
        maxLength: [225, 'minimum length is 3 - 255 char'],
        minLength: [3, 'minimum length is 3 - 255 char']
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
        default: 'user'
    },
    avatar: {
        type: String,
    },
    fileName: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Y', 'N'],
        default: 'Y'
    },
    phoneNumber: {
        type: String,
        require: [true, 'phone number field is required'],
        maxLength: [13, 'minimum length is 9 - 13 char'],
        minLength: [9, 'minimum length is 9 - 13 char'],
    },
    favorite: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
}, { timestamps: true })

playerSchema.path('email').validate(async function(value){
    try {
        const count = await this.model('Player').countDocuments({ email : value })
        return !count;
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} has been registered`)

playerSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})

export default mongoose.model('Player', playerSchema)