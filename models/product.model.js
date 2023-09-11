const { mongoose } = require("mongoose");

// Định nghĩa Schema và Model bằng Mongoose
const productSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: String,
  productType: String,
  createdDate: String,
  imageUrl: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
