// Import the Product model
const Product = require('../models/product');

// Controller to render the form for adding a new product
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        // Pass dynamic data into the EJS template
        pageTitle: 'Add Product', 
        formsCSS: true,          // Flag for form-specific styles
        productCSS: true,        // Flag for product styles
        activeAddProduct: true   // Used in the nav to highlight the active page
    });
};

// Controller to handle form submission when a product is added
exports.postAddProduct = (req, res, next) => {
    // Create a new Product instance using the submitted form data
    const product = new Product(req.body.title);

    // Save the new product (writes to products.json)
    product.save();

    // Redirect user back to the home/shop page after saving
    res.redirect('/');
};

// Controller to retrieve and render the list of products
exports.getProducts = (req, res, next) => {
    // Use the model's fetchAll method to read from the JSON file
    Product.fetchAll(products => {
        res.render('shop', {
            prods: products,                 // Array of products passed to the view
            pageTitle: 'Shop',              // Page title for the view
            hasProducts: products.length > 0, // Flag to conditionally render product list
            activeShop: true,               // Used to highlight the active nav link
            productCSS: true                // Flag for loading product-specific CSS
        });
    });
};
