const fs = require('fs');
const path = require('path');

const products = [];

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        const p = path.join(path.dirname(process.mainModule.filename), 'data');
    }

    static fetchAll() {
        return products;
    }
}