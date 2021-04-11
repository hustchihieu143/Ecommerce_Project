const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        cartItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Products",
                },
                quantity: { type: Number, default: 1 },
                price: { type: Number, required: true },
            },
        ],
    },
    { timestamps: true }
);

var Cart = mongoose.model("Cart", cartSchema, "Carts");
module.exports = Cart;
