const Cart = require("../models/cart");
const slugify = require("slugify");

exports.addItemToCart = (req, res) => {
    Cart.findOne({ user: req.user._id }).exec((err, user) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (user) {
            let product = req.body.cartItems.product;

            const item = user.cartItems.find((c) => c.product == product);
            let condition, update;

            if (item) {
                condition = {
                    user: req.user._id,
                    "cartItems.product": product,
                };
                update = {
                    $set: {
                        "cartItems.$": {
                            product: item.product,
                            price: item.price,
                            quantity:
                                item.quantity + req.body.cartItems.quantity,
                        },
                    },
                };
                Cart.findOneAndUpdate(condition, update).exec((err, _cart) => {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    if (_cart) {
                        return res.status(200).json({ cart: _cart });
                    }
                });
            } else {
                condition = { user: req.user._id };
                update = {
                    $push: {
                        cartItems: req.body.cartItems,
                    },
                };
                Cart.findOneAndUpdate(condition, update).exec((err, _cart) => {
                    if (err) {
                        return res.status(400).json(err);
                    }
                    if (_cart) {
                        return res.status(200).json({ cart: _cart });
                    }
                });
            }
        } else {
            const cart = new Cart({
                user: req.user._id,
                cartItems: req.body.cartItems,
            });

            cart.save((err, cart) => {
                if (err) {
                    return res.status(400).json({ err });
                }
                if (cart) {
                    return res.status(200).json({ cart });
                }
            });
        }
    });
};

exports.getItemFromCart = async (req, res) => {
    try {
        await Cart.findOne({ user: req.user._id }).exec((err, cart) => {
            if (err) {
                return res.status(400).json({ messeage: false });
            }
            if (cart) {
                console.log(cart);
                return res.status(200).json({
                    cart: cart,
                    messeage: true,
                });
            } else {
                return res.status(400).json({ messeage: "empty cart" });
            }
        });
    } catch (err) {
        return res.status(400).json({
            messeage: false,
            err: err.messeage,
        });
    }
};
