const mongoose = require('mongoose');

const BproductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: false },
  userEmail: { type: String, required: true }, // Updated from userId to userEmail
  productDetails: { type: String, required: true }, // New field for product details
  productCategory: { type: String, required: true }, // New field for product category
  phoneNumber: { type: String, required: true }, // New field for phone number
  createdAt: { type: Date, default: Date.now },
});

const BuyedProduct = mongoose.model('BuyedProduct', BproductSchema);

module.exports = BuyedProduct;
