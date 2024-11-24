const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../middlewares/authenticate-access-token');
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory
} = require('../../controllers/products/productsController');

// Public routes
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProduct);

// Protected routes (requires login)
router.use(protect);

// Admin and staff only routes
router.post('/', authorize('admin', 'staff'), createProduct);
router.put('/:id', authorize('admin', 'staff'), updateProduct);
router.delete('/:id', authorize('admin', 'staff'), deleteProduct);

module.exports = router;
