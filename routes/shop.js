const path = require('path');

const express = require('express');

// Import controller that handles product-related logic
const shopController = require('../controllers/shop');

// Create a router instance for shop-related routes
const router = express.Router();

// Displays the home page
router.get('/', shopController.getProducts);

// Displays the products page
router.get('/products');

// Displays the cart page
router.get('/cart');

// Displays the checkout page
router.get('/checkout');

module.exports = router;