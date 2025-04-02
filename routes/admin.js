// Core Node module for handling file paths (not currently used here, but often kept for consistency or future use)
const path = require('path');

// Import Express so we can create a router
const express = require('express');

// Import controller functions for product-related logic
const productsController = require('../controllers/products');

// Create a new router instance to define admin-specific routes
const router = express.Router();

// GET /admin/add-product
// Renders the form to add a new product
router.get('/add-product', productsController.getAddProduct);

// POST /admin/add-product
// Handles form submission and saves the new product
router.post('/add-product', productsController.postAddProduct);

// Export the router so it can be used in app.js
module.exports = router;