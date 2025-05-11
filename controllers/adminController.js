const Product = require('../models/productModel');


// Controller to render the form for adding a new product
exports.getAddProduct = (req, res, next) => {
    console.log('/admin/edit-product hit');
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        editing: false
    });
};

// Controller to handle form submission when a product is added
exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.error(err);
    });
};


// Controller to render the form for editing a product
exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                editing: editMode,
                product: product
            });
        }).catch(err => {
            console.log(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;

    Product.findByPk(prodId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDescription;
            return product.save();
        })
        .then(result => {
            console.log('Updated Product');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
        
};

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
            });
        })
        .catch(err => {
            console.log(err)
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            console.log('Product deleted');
            res.redirect('/admin/products');
        }).catch(err => {
            console.log(err);
        });
    res.redirect('/admin/products');
};