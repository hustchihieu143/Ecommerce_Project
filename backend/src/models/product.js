const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        parentId: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        offer: {
            type: Number,
        },
        productPictures: [{ img: { type: String } }],
        reviews: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
                review: String,
            },
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categorys",
        },
        createBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        updateAt: Date,
    },
    { timestamps: true }
);

var Product = mongoose.model("Product", productSchema, "Products");
module.exports = Product;
