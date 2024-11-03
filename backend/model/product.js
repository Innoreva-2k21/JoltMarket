const mongoose =require('mongoose')

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: String, required: true },
  image: {type: String, required: false},
  userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  createdAt: { type: Date, default: Date.now },
  
});

const Product = mongoose.model('Product', productSchema);

module.exports=Product;