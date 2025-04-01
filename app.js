const path = require('path');
const express = require('express');
const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop')

app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
