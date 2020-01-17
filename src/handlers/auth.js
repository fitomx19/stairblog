const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'No autorizado.');
    res.redirect('/users/signin');
};
// esto es un middleware que es una funcion de lo que le pasemos

module.exports = helpers;