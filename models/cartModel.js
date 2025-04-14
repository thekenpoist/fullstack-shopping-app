const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'data', 'cart.json');


module.exports = class Cart{
    static addProduct() {

        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (err) {
                cart = JSON.parse(fileContent);

            }
        })

    }

}