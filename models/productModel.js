
const Cart = require('./cartModel');

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
        
    }

    static deleteProductById(id) {
        
    }

    // Static method to fetch all saved products
    // Accepts a callback to return the list once loaded
    static fetchAll(cb) {

    }

    static findById(id, cb) {
        
    }
};