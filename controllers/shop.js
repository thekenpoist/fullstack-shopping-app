const Product = require('../models/product');

// Controller to retrieve and render the list of products
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,                 // Array of products passed to the view
            pageTitle: 'Shop',              
            hasProducts: products.length > 0, // Flag to conditionally render product list
            activeShop: true,               // Used to highlight the active nav link
            productCSS: true                // Flag for loading product-specific CSS
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,                 // Array of products passed to the view
            pageTitle: 'Shop',              
            hasProducts: products.length > 0, // Flag to conditionally render product list
            activeShop: true,               // Used to highlight the active nav link
            productCSS: true                // Flag for loading product-specific CSS
        });
    });
}