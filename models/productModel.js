const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

// Construct the absolute path to the products.json file
const p = path.join(__dirname, '..', 'data', 'products.json');

// Helper function to read products from the JSON file
// Accepts a callback function (cb) to return the products once read
const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            // If file doesn't exist or can't be read, return an empty array
            return cb([]);
        }
        try {
            // Try to parse the file content as JSON and pass it to the callback
            const products = JSON.parse(fileContent);
            cb(products);
        } catch (e) {
            // If JSON is malformed, log the error and return an empty array
            console.error('Invalid JSON, returning empty array.');
            cb([]);
        }
    });
};

// Product model class
module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    // Save the current product instance to the JSON file
    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    if (err) console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                // Push the current product into the list of existing products
                products.push(this);
                // Overwrite the JSON file with the updated product list
                fs.writeFile(p, JSON.stringify(products), err => {
                    if (err) console.log(err);
                });
            }
            
        });
    }

    static deleteProductById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProductFromCart(id, product.price);
                }
            });
        });
    }

    // Static method to fetch all saved products
    // Accepts a callback to return the list once loaded
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
};