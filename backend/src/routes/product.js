const express = require("express");
const router = express.Router();
const {
    createProduct,
    getProductsBySlug,
    removeProduct,
    updateProduct,
    getProducts,
    getProduct,
    searchProductByName,
    getProductsByCategoryId,
} = require("../controller/product");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

const {
    requireSignin,
    adminMiddleware,
} = require("../common-middleware/index");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

router.post(
    "/admin/product/create",
    requireSignin,
    adminMiddleware,
    upload.array("productPictures"),
    createProduct
);

router.get("/products/:slug", requireSignin, getProductsBySlug);
//router.get("/products/:slug", getProductsBySlug);

router.post(
    "/admin/product/delete/:_id",
    requireSignin,
    adminMiddleware,
    removeProduct
);

router.post(
    "/admin/product/update/:_id",
    requireSignin,
    adminMiddleware,
    upload.array("productPictures"),
    updateProduct
);

router.get("/products", getProducts);

router.post("/product/search", searchProductByName);

router.get("/product/:_id", getProduct);

router.get("/getproducts/:categoryId", getProductsByCategoryId);

module.exports = router;
