const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        address: {
            type: String,
            require: true,
        },
        // product: { type: String },
        // category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        total: {
            type: Number,
        },
        trangThai: {
            type: String,
        },
    },
    { timestamps: true }
);

var Order = mongoose.model("Order", orderSchema, "Orders");
module.exports = Order;
