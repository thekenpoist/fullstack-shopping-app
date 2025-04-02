// Core module for handling file and directory paths (not currently used but commonly included for future flexibility)
const path = require('path');

// Import Express so we can define routes
const express = require('express');

// Import controller that handles product-related logic
const productsController = require('../controllers/products');

// Create a router instance for shop-related routes
const router = express.Router();

// GET /
// Displays the shop page with the list of products
router.get('/', productsController.getProducts);

// Export the router so it can be registered in app.js
module.exports = router;