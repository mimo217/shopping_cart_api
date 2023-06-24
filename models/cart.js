const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
 user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
 items:{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true},
 quantity:{type: Number, default: 1, required: true}
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart