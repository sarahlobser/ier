var models = require('../../app_api/models');

var request = require('request');

module.exports.index = function (req, res) {
            if (req.signedCookies.cart) {
                var totalPrice = 0;
                var cart = req.signedCookies.cart;
                for (var i = 0; i < cart.length; i++) {
                    totalPrice += cart[i].price;
                }
                res.render('cart', {user: req.user, cart: req.signedCookies.cart, totalPrice: totalPrice});
            } else {
                res.render('cart', {user: req.user, message: "Your cart is empty"});
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

module.exports.checkout = function(req, res) {
    if(req.user){
        if(req.signedCookies.cart) {
            var totalPrice = 0;
            var errors = [];
            var soldOut;
            var cart = req.signedCookies.cart;
            
            for(var i = 0; i < cart.length; i++) {
                totalPrice += cart[i].price;
//                request.get('http://localhost:3000/api/products/' + cart[i].id, function (error, response, body) {
//                if (!error) {
//                    var product = JSON.parse(body);
//                    
//                    if(product.quantity == 0) {
//                        console.log(product);
//                        errors.push(product.name + " is sold out!");
//                        
//                    }
//                } else {
//                    response.sendStatus(500);
//                }
//                  
//                });
                
                var productToUpdate = JSON.stringify({
                    id : cart[i].id,
                    category : cart[i].category,
                    price : Number(cart[i].price),
                    description : cart[i].description,
                    rating : Number(cart[i].rating),
                    brand : cart[i].brand,
                    name : cart[i].name,
                    quantity : ((cart[i].quantity > 0)? cart[i].quantity - 1 : 0)
                });
                
                request.put({
                    url : 'http://localhost:3000/api/products/' + cart[i].id,
                    headers : {'Content-type' : 'application/json'},
                    body : productToUpdate
                }, function(error, response, body) {
                    if(!error) {
                     //   res.redirect('/products/' + req.params.id);
                    } else {
                        console.log(error);
                    //res.redirect('/products');
                }
                });
                
                
                
                
                
                
                
                
                console.log(errors);
            console.log(errors.length); 
            }
            message = "You have " + cart.length + " items in your cart.";
            console.log("outside loop");
            console.log(errors);
            console.log(errors.length); 
            if(cart.soldOut) {
                message = "Your purchase cannot be completed. Please modify your selection.";
                console.log(message);
                res.render('cart', {cart : cart, message : message, errors : errors, totalPrice : totalPrice});
            } else {
            res.render('purchase', {cart : cart, totalPrice : totalPrice, message : message});
            }
        } else {
            //the cart is empty
        }
        
    } else {
        res.redirect('/login');
    }
    //check if user is logged in. If not redirect to login page
    //check the quantity of each item in the cart. Save quantities in array.
    //if quantity is 0, display error message under item in cart with option to remove item.
    //if all quantities are good, go to confirm page.
}

