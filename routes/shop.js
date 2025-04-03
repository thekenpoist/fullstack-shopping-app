const path = require('path');

const express = require('express');

// Import controller that handles product-related logic
const productsController = require('../controllers/products');

// Create a router instance for shop-related routes
const router = express.Router();

// Displays the shop page with the list of products
router.get('/', productsController.getProducts);

module.exports = router;