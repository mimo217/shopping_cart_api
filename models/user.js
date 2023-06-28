const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: 'Cart'}
})

userSchema.pre('save', async function(next){
    this.isModified('password')? 
    this.password = await brycrypt.hash(this.password, 6):
    null;
    next()
})

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({ _id: this._id }, process.env.SECRET)
    return token
}


const User = mongoose.model('User', userSchema)

module.exports = User