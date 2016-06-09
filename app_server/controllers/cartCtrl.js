var models = require('../../app_api/models');

var request = require('request');
var appURI = "http://localhost:3000/";
if (process.env.PRODUCTION_URL) {
    appURI = process.env.PRODUCTION_URL;
}

module.exports.index = function (req, res) {
    var totalPrice = 0;
    if (req.signedCookies.cart) {
        var cart = req.signedCookies.cart;
        for (var i = 0; i < cart.length; i++) {
            totalPrice += cart[i].price;
        }
        res.render('cart', {
            user: req.user
            , cart: req.signedCookies.cart
            , totalPrice: totalPrice
        });
    } else {
        res.render('cart', {
            user: req.user
            , message: "Your cart is empty"
            , totalPrice: totalPrice 
        });
    }

};

module.exports.removeProduct = function (req, res) {
    var productId = req.params.id;
    var totalPrice = 0;
    console.log(req.signedCookies.cart.length);
    if (req.signedCookies.cart) {
        var cart = req.signedCookies.cart;
        for (var i = 0; i < cart.length; i++) {
            totalPrice += cart[i].price;
        }
        for (var i = 0; i < cart.length; i++) {
            //console.log(typeof(cart[i].id) + " " + typeof(productId));
            if (cart[i].id == productId) {
                totalPrice -= cart[i].price;
                cart.splice(i, 1);
            }
        };
        res.cookie('cart', cart, {
            signed: true
        });
        res.render('cart', {
            user: req.user
            , cart: cart
            , totalPrice: totalPrice
        });
    }
};

module.exports.checkout = function (req, res) {
    var totalPrice = 0;
    if (req.user) {
        if (req.signedCookies.cart) {
            totalPrice = 0;
            var errors = [];
            var soldOut;
            var cart = req.signedCookies.cart;

            for (var i = 0; i < cart.length; i++) {
                totalPrice += cart[i].price;
            }

            message = "You have " + cart.length + " items in your cart.";
            res.cookie('cart', cart, {
                signed: true
            });
            res.render('purchase', {
                user: req.user
                , cart: cart
                , totalPrice: totalPrice
                , message: message
            });

        } else {
            //the cart is empty
        }

    } else {
        res.redirect('/login');
    }
};

module.exports.confirm = function (req, res) {
    if (req.user) {
        if (req.signedCookies.cart) {
            var totalPrice = 0;
            var errors = [];
            var soldOut;
            var cart = req.signedCookies.cart;

            for (var i = 0; i < cart.length; i++) {
                totalPrice += cart[i].price;
                cart[i].quantity = ((cart[i].quantity > 0) ? cart[i].quantity - 1 : 0);

                var productToUpdate = JSON.stringify({
                    id: cart[i].id
                    , category: cart[i].category
                    , price: Number(cart[i].price)
                    , description: cart[i].description
                    , rating: Number(cart[i].rating)
                    , brand: cart[i].brand
                    , name: cart[i].name
                    , quantity: cart[i].quantity
                });

                request.put({
                    url: appURI + 'api/products/' + cart[i].id
                    , headers: {
                        'Content-type': 'application/json'
                    }
                    , body: productToUpdate
                }, function (error, response, body) {
                    if (!error) {
                        //   res.redirect('/products/' + req.params.id);
                    } else {
                        console.log(error);
                    }
                });

            }
            while (cart.length > 0) {
                cart.pop();
            }
            res.clearCookie('cart');
        }

        message = "Thank you for your INTENSE purchase! We will contact you in 4 to 6 weeks via email to confirm details.";

        res.render('purchase', {
            user: req.user
            , message: message
        });

    } else {
        res.redirect('/login');
    }

}