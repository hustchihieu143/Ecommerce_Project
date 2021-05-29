const Cart = require("../models/cart");
const slugify = require("slugify");

exports.addItemToCart = (req, res) => {
    Cart.findOne({ user: req.user._id }).exec((err, user) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (user) {
            let product = req.body.cartItems.product;
            console.log(product);
            console.log("addToCart");
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
                            img: item.img,
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

exports.deleteCartItem = async function (req, res) {
    let productId = req.params.id;
    await Cart.findOne({ user: req.user._id }).exec((err, cart) => {
        if (err) return res.status(404).json({ message: err.message });
        else {
            let condition = {
                user: req.user._id,
            };
            let update = {
                $pull: { cartItems: { product: productId } },
            };
            Cart.update(condition, update, { multi: true }).exec(
                (err, result) => {
                    if (err) {
                        return res.status(404).json({ message });
                    } else
                        return res
                            .status(200)
                            .json({ message: "Update thanh cong" });
                }
            );
        }
    });
};

exports.updateCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = findOne({ user: userId });
        if (cart) {
        } else {
            return res
                .status(404)
                .json({ message: "Không có sản phẩm trong giỏ hàng" });
        }
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};
