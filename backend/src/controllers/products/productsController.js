const Product = require('../../models/products/productModel');
const fs = require('fs').promises;
const path = require('path');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Please upload a product image'
      });
    }

    const {
      name,
      description,
      price,
      category,
      subCategory,
      preparationTime,
      stockQuantity,
      ingredients
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !subCategory || !preparationTime) {
      // Delete uploaded file if validation fails
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields'
      });
    }

    // Create image URL
    const imageUrl = `/uploads/${req.file.filename}`;

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      image: imageUrl,
      preparationTime: Number(preparationTime),
      stockQuantity: Number(stockQuantity) || 0,
      ingredients: ingredients ? ingredients.split(',').map(item => item.trim()) : [],
      createdBy: req.user._id
    });

    res.status(201).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    // Delete uploaded file if product creation fails
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const filters = {};
    
    if (req.query.category) {
      filters.category = req.query.category;
    }
    if (req.query.isAvailable) {
      filters.isAvailable = req.query.isAvailable === 'true';
    }
    if (req.query.minPrice) {
      filters.price = { $gte: parseFloat(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      filters.price = { ...filters.price, $lte: parseFloat(req.query.maxPrice) };
    }

    const products = await Product.find(filters)
      .populate('createdBy', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };
    
    // Handle image upload if new image is provided
    if (req.file) {
      // Delete old image if it exists
      const product = await Product.findById(req.params.id);
      if (product && product.image) {
        const oldImagePath = path.join('public', product.image);
        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.log('Error deleting old image:', err);
        }
      }
      
      updates.image = `/uploads/${req.file.filename}`;
    }

    // Convert string numbers to actual numbers
    if (updates.price) updates.price = Number(updates.price);
    if (updates.preparationTime) updates.preparationTime = Number(updates.preparationTime);
    if (updates.stockQuantity) updates.stockQuantity = Number(updates.stockQuantity);
    
    // Handle ingredients array
    if (updates.ingredients && typeof updates.ingredients === 'string') {
      updates.ingredients = updates.ingredients.split(',').map(item => item.trim());
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      // Delete uploaded file if product not found
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    // Delete uploaded file if update fails
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }

    if (product.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this product'
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a search query'
      });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ],
      isAvailable: true
    }).populate('createdBy', 'name email');

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};


exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    
    const validCategories = ['cakes', 'pastries', 'cookies', 'bread', 'other'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid category'
      });
    }

    const products = await Product.find({
      category,
      isAvailable: true
    }).populate('createdBy', 'name email');

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
