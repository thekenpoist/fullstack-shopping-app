const path = require('path');

const express = require('express');

// Import controller functions for product-related logic
const adminController = require('../controllers/admin');

// Create a new router instance to define admin-specific routes
const router = express.Router();

// Renders the form to add a new product
router.get('/add-product', adminController.getAddProduct);

// Renders the products page
router.get('/products', adminController.getProducts);

// Handles form submission and saves the new product
router.post('/add-product', adminController.postAddProduct);

module.exports = router; 