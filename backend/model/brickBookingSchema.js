const mongoose = require("mongoose");

const bricksBookingSchema = new mongoose.Schema({

    brickId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brick",
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true
    },
    location: {
    lat: Number,
    lng: Number
},

    totalAmount: {
        type: Number,
        required: true
    },

    deliveryDate: {
        type: Date,
        required: true
    },

    message: {
        type: String
    },

    status: {
        type: String,
        enum: ["pending", "confirmed", "delivered", "cancelled"],
        default: "pending"
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending"
    }

}, { timestamps: true });

module.exports = mongoose.model("BricksBooking", bricksBookingSchema);