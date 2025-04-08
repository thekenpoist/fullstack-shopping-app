const Product = require('../models/product');

// Controller to retrieve and render the list of products
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,                 // Array of products passed to the view
            pageTitle: 'All Products',              
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId);
    res.redirect('/');
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,                 // Array of products passed to the view
            pageTitle: 'Index',
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart'
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout'
    });

};