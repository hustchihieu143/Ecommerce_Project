const express = require("express");
const router = express.Router();
const { requireSignin, userMiddleware } = require("../common-middleware/index");
const { addItemToCart, getItemFromCart } = require("../controller/cart");

router.post(
    "/user/cart/addtocart",requireSignin,userMiddleware,addItemToCart
);

router.get("/user/cart/getcart", requireSignin, userMiddleware, getItemFromCart);

module.exports = router;
