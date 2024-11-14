const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  stock: {
    type: Number,
  },
  category:{
    type: String
  },
  description: {
    type: String,
  },
  ingredients: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
  },
});

const product = mongoose.model("Product", productSchema);

module.exports = product;
