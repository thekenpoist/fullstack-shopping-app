// Controller for handling 404 errors (Page Not Found)
// This gets called as a fallback when no other route matches
exports.get404 = (req, res, next) => {
    // Set HTTP status to 404 and render the "404" view
    res.status(404).render('404', {
        pageTitle: 'Page Not Found'  // Pass page title to the view template
    });
};
