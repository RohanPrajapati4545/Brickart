const mongoose = require("mongoose")

const brickSchema = new mongoose.Schema({
  brickName: {
    type: String,
    required: true
  },
  pricePerBrick: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  description: String,
  image: String,
  video: String,
  size: String,
}, { timestamps: true })

module.exports = mongoose.model("Brick", brickSchema)