const express = require("express");
const router = express.Router();
const { requireSignin, userMiddleware } = require("../common-middleware/index");
const { handleOrder } = require("../controller/order");

router.post("/product/order", requireSignin, userMiddleware, handleOrder);

module.exports = router;
