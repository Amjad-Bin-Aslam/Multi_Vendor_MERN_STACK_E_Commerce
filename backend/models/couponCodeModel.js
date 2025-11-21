const mongoose = require('mongoose')

const couponCodeSchem = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your coupon code name!"],
        unique: true
    },
    value: {
        type: Number,
        required: [true, "Please enter your coupon code percentage value!"]
    },
    minAmount: {
        type: Number
    },
    maxAmount: {
        type: Number
    },
    shop: {
        type: Object,
        required: true
    },
    selectedProducts: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const couponCodeModel = mongoose.model('couponCode', couponCodeSchem)
module.exports = couponCodeModel
