const { Types } = require("mongoose");
const productModel = require("../../models/products/productModel");
const asyncHandler = require("express-async-handler");
const Joi = require("joi");

const productSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  image: Joi.string().uri().optional(),
  stock: Joi.number().integer().min(0).required(),
  category: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(500).optional(),
  ingredients: Joi.array().items(Joi.string().min(1)).optional(),
  price: Joi.number().positive().precision(2).required(),
});

// getall
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
});
// getbyid
exports.getProductById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!Types.ObjectId.isValid(id)) {
    res.status(400).json({
      success: false,
      message: "Invalid object is",
    });
  }
  try {
    const product = await productModel.findById(id);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
});
// getbycategory
exports.getProductByCategory = asyncHandler(async (req, res, next) => {
  try {
    const product = await productModel.find({ category: req.params.category });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});
// bytitle
exports.getProductByTitle = asyncHandler(async (req, res, next) => {
  try {
    const product = await productModel.find({ title: req.params.title });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
});

// add product
exports.addProduct = asyncHandler(async (req, res, next) => {
  const { error, value } = productSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  try {
    const newProduct = new productModel(value);
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
});
