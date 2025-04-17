const path = require('path');

const express = require('express');

// Import controller that handles product-related logic
const shopController = require('../controllers/shopController');

// Create a router instance for shop-related routes
const router = express.Router();

// Displays the home page
router.get('/', shopController.getIndex);

// Displays the products page
router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct)

// Displays the cart page
router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postDeleteProductFromCart);

// Displays the cart page
router.get('/orders', shopController.getOrders);

// Displays the checkout page
router.get('/checkout', shopController.getCheckout);

module.exports = router; 