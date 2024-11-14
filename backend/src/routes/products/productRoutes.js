const express = require("express");
const productRouter = express.Router();
const {
  addProduct,
  getAllProducts,
  getProductByCategory,
  getProductById,
  getProductByTitle,
} = require("../../controllers/products/productsController");

productRouter.get("/all", getAllProducts);
productRouter.get("/:category", getProductByCategory);
productRouter.get("/:id", getProductById);
productRouter.get("/:title", getProductByTitle);
productRouter.post("/create", addProduct);

module.exports = productRouter;
