const path = require('path');

const express = require('express');

// Import controller functions for product-related logic
const productsController = require('../controllers/products');

// Create a new router instance to define admin-specific routes
const router = express.Router();

// Renders the form to add a new product
router.get('/add-product', productsController.getAddProduct);

// Handles form submission and saves the new product
router.post('/add-product', productsController.postAddProduct);

module.exports = router;