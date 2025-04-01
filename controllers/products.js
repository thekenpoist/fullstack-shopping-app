exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product', 
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

