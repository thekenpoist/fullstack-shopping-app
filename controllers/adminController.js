const Product = require('../models/productModel');


// Controller to render the form for adding a new product
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product' 
    });
};

// Controller to handle form submission when a product is added
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,                 // Array of products passed to the view
            pageTitle: 'Admin Products',
        });
    });
};