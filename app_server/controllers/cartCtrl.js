var models = require('../../app_api/models');

module.exports.index = function (req, res) {
            if (req.signedCookies.cart) {
                res.render('cart', {cart: req.signedCookies.cart});
            } else {
                res.render('cart', {message: "Your cart is empty"});
            }
};

module.exports.removeProduct = function (req, res) {
    var productId = req.params.id;
    console.log(req.signedCookies.cart.length);
    if (req.signedCookies.cart) {
        var cart = req.signedCookies.cart;
        for (var i = 0; i < cart.length; i++) {
            //console.log(typeof(cart[i].id) + " " + typeof(productId));
            if (cart[i].id == productId) {
                cart.splice(i, 1);
            }
        };
        res.cookie('cart', cart, {
            signed: true
        });
        res.render('cart', {
            user: req.user
            , cart: cart
        });
    }
};

module.exports.checkout = function(req, res) {
    //check if user is logged in. If not redirect to login page
    //check the quantity of each item in the cart. Save quantities in array.
    //if quantity is 0, display error message under item in cart with option to remove item.
    //if all quantities are good, go to confirm page.
}
