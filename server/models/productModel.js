import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please filled a productName"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Please filled a description"],
  },
  category: {
    type: String,
    required: [true, "Please filled a category"],
  },
  price: {
    type: Number,
    required: [true, "Please filled a number"],
  },
  productImg: {
    url: {
      type: String,
    },
  },
  ratings: {
    type: Number,
  },
  manufacture: {
    type: String,
  },
  isInStock: {
    type: Number,
    required: [true, "Please filled a isInStock"],
  },
  SKU: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product = new mongoose.model("product", productSchema);
export default Product;
