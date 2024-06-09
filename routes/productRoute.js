const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductByID,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Routes for product CRUD operations
router
  .route('/')
  .post(addProduct)     // Add new product
  .get(getProducts);    // Get all products

router
  .route('/:id')
  .get(getProductByID)  // Get product by ID
  .put(updateProduct)   // Update product by ID
  .delete(deleteProduct); // Delete product by ID

module.exports = router;
