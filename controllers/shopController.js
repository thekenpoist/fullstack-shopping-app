const Product = require('../models/productModel');
const Cart = require('../models/cartModel');

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
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    })
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/index', {
                prods: products,                 // Array of products passed to the view
                pageTitle: 'Index'
            });
        })     
        .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    Cart.getCartProducts( cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProductToCart(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.postDeleteProductFromCart = (req, res, nest) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProductFromCart(prodId, product.price);
        res.redirect('/cart');
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