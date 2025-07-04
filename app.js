const path = require('path');

const express = require('express');

// Import the controller that handles 404 errors
const errorController = require('./controllers/errorController');
const sequelize = require('./config/database');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const Cart = require('./models/cartModel');
const CartItem = require('./models/cartItemModel');

const app = express();

// Set the view engine to EJS for rendering dynamic HTML
app.set('view engine', 'ejs');
// Set the directory where the view templates are located
app.set('views', 'views');

// Middleware to make the current request path available in all views
// Useful for highlighting active navigation links, etc.
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// Import route handlers for the admin and shop sections of the app
const adminRoutes = require('./routes/adminRoute');
const shopRoutes = require('./routes/shopRoute');

// Middleware to parse incoming form data (from POST requests)
app.use(express.urlencoded({ extended: false }));

// Middleware to serve static files (CSS, images, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err)
        });
});

// Prefix all admin routes with "/admin"
app.use('/admin', adminRoutes);

// Handle shop-related routes (e.g., "/", "/products")
app.use(shopRoutes);

// Fallback middleware for handling 404 errors
app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//sequelize.sync()
sequelize.sync({ force: true })
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({ name: 'Fred', email: 'hunkdiefred@mail.com' });
        }
        return user;
    })
    .then(user=> {
        app.listen(3000);
    })
    .catch (err => {
        console.log(err);
    });
