const mongoose = require("mongoose")
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    brickId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brick',
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true
    },

    razorpay_payment_id: {
        type: String,
        default: null
    },
    razorpay_signature: {
        type: String,
        default: null
    },
    receipt: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "INR"
    },
    payment_method: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    }
},
    { timestamps: true }
)
const Order = new mongoose.model('Order', orderSchema)
module.exports = Order