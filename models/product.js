const fs = require('fs');
const path = require('path');

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
    constructor(title, imageUrl, description, price) {
        // Initialize a product with a title (you could add more fields later)
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    // Save the current product instance to the JSON file
    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            // Push the current product into the list of existing products
            products.push(this);

            // Overwrite the JSON file with the updated product list
            fs.writeFile(p, JSON.stringify(products), err => {
                if (err) console.log(err);
            });
        });
    }

    // Static method to fetch all saved products
    // Accepts a callback to return the list once loaded
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
};