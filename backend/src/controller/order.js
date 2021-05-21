const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");

module.exports.handleOrder = (req, res) => {
    const userId = req.user._id;
    console.log(userId);
    Cart.findOne({ user: userId }).exec((err, cartItem) => {
        if (err) return res.status(404).json({ message: err.message });
        if (cartItem) {
            console.log("find user");
            let total = 0;
            for (let i = 0; i < cartItem.cartItems.length; i++) {
                total +=
                    cartItem.cartItems[i].price *
                    cartItem.cartItems[i].quantity;
            }
            order = new Order({
                user: userId,
                address: req.body.address,
                trangThai: "Da duyet",
                total: total,
            });
            order.save((err, order) => {
                if (err) return res.status(404).json({ message: err.message });
                if (order) {
                    Cart.findOneAndRemove({ user: userId }).exec(
                        (err, success) => {
                            if (err)
                                return res.status(404).json({ message: err });
                            if (success) {
                                for (
                                    let i = 0;
                                    i < cartItem.cartItems.length;
                                    i++
                                ) {
                                    Product.findOne({
                                        _id: cartItem.cartItems[i].product,
                                    }).exec((err, product) => {
                                        if (err)
                                            return res
                                                .status(404)
                                                .json({ message: err.message });
                                        if (product) {
                                            console.log("okoko");
                                            let quantity = product.quantity;
                                            let condition = {
                                                _id: cartItem.cartItems[i]
                                                    .product,
                                            };
                                            let update = {
                                                quantity:
                                                    quantity -
                                                    cartItem.cartItems[i]
                                                        .quantity,
                                            };
                                            Product.findOneAndUpdate(
                                                condition,
                                                update
                                            ).exec((err, product) => {
                                                if (err)
                                                    return res
                                                        .status(404)
                                                        .json({
                                                            message:
                                                                err.message,
                                                        });

                                                if (product)
                                                    return res
                                                        .status(200)
                                                        .json({
                                                            message: "true",
                                                        });
                                            });
                                        }
                                    });
                                }
                            }
                        }
                    );
                }
            });
        } else {
            return res
                .status(404)
                .json({ message: "ban chua them sanr pham vao gio hang" });
        }
    });
};
