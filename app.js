// Core Node module for handling file paths
const path = require('path');

// Import Express framework
const express = require('express');

// Import the controller that handles 404 errors
const errorController = require('./controllers/error');

// Initialize the Express app
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
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Middleware to parse incoming form data (from POST requests)
app.use(express.urlencoded({ extended: false }));

// Middleware to serve static files (CSS, images, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Prefix all admin routes with "/admin"
app.use('/admin', adminRoutes);

// Handle shop-related routes (e.g., "/", "/products")
app.use(shopRoutes);

// Fallback middleware for handling 404 errors
app.use(errorController.get404);

// Start the server and listen on port 3000
app.listen(3000);