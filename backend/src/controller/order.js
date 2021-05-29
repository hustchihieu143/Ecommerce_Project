const Order = require("../models/order");
const Cart = require("../models/cart");
const Product = require("../models/product");
const User = require("../models/user");

module.exports.handleOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId);
        let userName;
        const user = await User.findOne({ _id: userId });
        if (user) {
            userName = user.firstName + " " + user.lastName;
        }

        let cartItem = await Cart.findOne({ user: userId });
        if (cartItem) {
            let total = 0;
            let address = {
                country: req.body.address.country,
                city: req.body.address.city,
                district: req.body.address.district,
                ward: req.body.address.ward,
            };
            let listProducts = [];
            let product = {};
            let productName, productImg;
            for (let i = 0; i < cartItem.cartItems.length; i++) {
                total +=
                    cartItem.cartItems[i].price *
                    cartItem.cartItems[i].quantity;

                const findProduct = await Product.findOne({
                    _id: cartItem.cartItems[i].product,
                });
                if (findProduct) {
                    productName = findProduct.name;
                    productImg = findProduct.productPictures[0].img;
                    console.log("Product name: ", productName);
                }
                console.log("Product img: ", productImg);
                product = {
                    name: productName,
                    productId: cartItem.cartItems[i].product,
                    quantity: cartItem.cartItems[i].quantity,
                    price: cartItem.cartItems[i].price,
                    img: productImg,
                };
                listProducts.push(product);
            }
            order = new Order({
                user: userId,
                userName: userName,
                address: address,
                listProducts: listProducts,
                total: total,
                status: "Chờ xác nhận",
            });
            await order.save();
            deleteCart(userId, cartItem.cartItems);
            console.log("den duoc day roi");
            return res.status(200).json({ message: true });
        }
    } catch (err) {
        return res.status(400).json({
            message: err.message,
        });
    }
};

deleteCart = async (userId, cartItems) => {
    console.log("cartItem: ", cartItems[0]);
    try {
        let success = await Cart.findOneAndRemove({ user: userId });
        if (success) {
            for (let i = 0; i < cartItems.length; i++) {
                updateProduct(cartItems[i]);
            }
        }
    } catch (err) {
        return res.status(400).json({ message: err });
    }
};

updateProduct = async (item) => {
    try {
        let product = await Product.findOne({ _id: item.product });
        if (product) {
            let quantity = product.quantity; // số lượng sản phẩm trong tbl Product
            let condition = { _id: item.product };
            let update = { quantity: quantity - item.quantity };
            await Product.findOneAndUpdate(condition, update);
        }
    } catch (err) {
        return res.status(400).json({ message: err });
    }
};

module.exports.updateStatus = async (req, res) => {
    try {
        const billId = req.params._id;
        const newStatus = req.body.status;
        const update = await Order.findByIdAndUpdate(
            { _id: billId },
            { status: newStatus }
        );
        if (update) {
            return res.status(200).json({
                message: "update thanh cong",
                update: update,
            });
        }
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};
