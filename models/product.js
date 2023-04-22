const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
    minLength: 50,
    maxLength: 250,
  },
  productPrice: {
    type: Number,
    required: true,
    min: 1,
    max: 99999,
  },
});

module.exports = mongoose.model("Product", productSchema);
