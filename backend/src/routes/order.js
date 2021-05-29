const express = require("express");
const router = express.Router();
const {
    requireSignin,
    userMiddleware,
    adminMiddleware,
} = require("../common-middleware/index");
const { handleOrder, updateStatus } = require("../controller/order");

router.post("/product/order", requireSignin, userMiddleware, handleOrder);

router.post(
    "/order/update-status/:_id",
    requireSignin,
    adminMiddleware,
    updateStatus
);

module.exports = router;
