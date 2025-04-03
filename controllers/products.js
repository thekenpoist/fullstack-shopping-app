const Product = require('../models/product');

// Controller to render the form for adding a new product
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product', 
        formsCSS: true,          // Flag for form-specific styles
        productCSS: true,        // Flag for product styles
        activeAddProduct: true   // Used in the nav to highlight the active page
    });
};

// Controller to handle form submission when a product is added
exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

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
