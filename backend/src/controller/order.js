const Order = require("../models/order");
const Cart = require("../models/cart");

module.exports.handleOrder = (req, res) => {
    const userId = req.user._id;
    Cart.findOne({ user: userId }).exec((err, cartItem) => {
        if (err) return res.status(404).json({ message: err.message });
        if (cartItem) {
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
                            if (success)
                                return res.status(200).json({
                                    message: "Remove cart success",
                                    order: order,
                                });
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
