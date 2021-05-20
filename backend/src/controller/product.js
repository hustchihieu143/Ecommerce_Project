const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require("../models/category");

exports.createProduct = (req, res) => {
    const { name, price, description, category, quantity, createBy } = req.body;
    let productPictures = [];
    console.log("body: ", req.body);
    console.log("file: ", req.files);
    console.log("req: ", req);
    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
            return { img: file.filename };
        });
    }
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createBy: req.user._id,
    });

    product.save((error, product) => {
        if (error) return res.status(400).json({ error });
        if (product) {
            res.status(201).json({ product });
        }
    });
};

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug }).exec((err, category) => {
        if (err)
            return res.status(400).json({
                message: err.message,
            });

        if (category) {
            Product.find({ category: category._id }).exec((err, products) => {
                if (err) {
                    return res.status(400).json({ message: err });
                }

                if (products.length > 0) {
                    return res.status(200).json({
                        products: products,
                        ProductsByPrice: {
                            under5k: products.filter(
                                (product) => product.price <= 5000
                            ),
                            under20k: products.filter(
                                (product) => product.price <= 20000
                            ),
                            under50k: products.filter(
                                (product) => product.price <= 50000
                            ),
                            under100k: products.filter(
                                (product) => product.price <= 100000
                            ),
                            under500k: products.filter(
                                (product) => product.price <= 500000
                            ),
                            under1000k: products.filter(
                                (product) => product.price <= 100000
                            ),
                        },
                    });
                } else {
                    return res.status(404).json({
                        message: "Not found product.",
                    });
                }
            });
        }
    });
};

exports.removeProduct = (req, res) => {
    const id = req.params._id;
    Product.findOneAndDelete({ _id: id }).exec((err, result) => {
        if (err) {
            return res.status(404).json({ message: err.message });
        }
        if (result) {
            return res.status(200).json({
                message: "Delete Product success...",
            });
        } else {
            return res.status(404).json({
                message: "Product not found",
            });
        }
    });
};

exports.updateProduct = (req, res) => {
    const id = req.params._id;
    const { name, price, description, category, quantity, createBy } = req.body;
    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
            return { img: file.filename };
        });
    }
    let condition, update;
    condition = { _id: id };
    update = {
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createBy: req.user._id,
    };
    Product.findOne(condition).exec((err, product) => {
        if (err) {
            return res.status(404).json({ message: err.message });
        }

        if (product) {
            Product.findOneAndUpdate(condition, update).exec((err, product) => {
                if (err) {
                    return res.status(404).json({ message: err.message });
                }

                if (update) {
                    return res.status(200).json({ message: update });
                }
            });
        }
    });
};

exports.getProducts = async function (req, res) {
    try {
        Product.find().then((products) => {
            return res.json({
                products: products,
                message: true,
            });
        });
    } catch (err) {
        return res.json({ message: false });
    }
};

exports.getProduct = async function (req, res) {
    try {
        let id = req.params._id;
        await Product.findOne({ _id: id }).exec((err, product) => {
            if (err) {
                return res.json({ message: false });
            }
            if (product) {
                return res.json({ message: true, product: product });
            }
        });
    } catch (err) {
        return res.json({ message: false });
    }
};

exports.searchProductByName = async function (req, res) {
    let q = req.body.value;
    console.log(q);
    console.log("alo");
    await Product.find({ name: { $regex: q } }).exec((err, product) => {
        if (err) return res.status(404).json({ message: err.message });
        else {
            return res.status(200).json({
                products: product,
                message: true,
            });
        }
    });
};
