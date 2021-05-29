const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, // userId
        userName: { type: String },
        address: {
            country: { type: String }, // quoc gia
            city: { type: String }, // tinh, thanh pho
            district: { type: String }, // quan, huyen
            ward: { type: String }, // phuong, xã
        },
        listProducts: [
            {
                name: { type: String },
                productId: { type: String },
                quantity: { type: Number },
                price: { type: Number },
                img: { type: String },
            },
        ],
        total: {
            // tong gia tri don hang
            type: Number,
        },
        status: {
            type: String,
        },
    },
    { timestamps: true }
);

var Order = mongoose.model("Order", orderSchema, "Orders");
module.exports = Order;
