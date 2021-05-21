const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        const user = jwt.verify(token, process.env.JWT_SECRET); // submit token to show profile
        req.user = user;
    } else {
        return res.status(400).json({ message: "Authorization required" });
    }
    console.log("pass requireSignin");
    next();
};

exports.userMiddleware = (req, res, next) => {
    const id = req.user._id;
    User.findOne({ _id: id }).exec((error, user) => {
        if (error) {
            return res.status(400).json({ message: "user not found" });
        }
        if (user) {
            if (user.role !== "user") {
                return res.status(400).json({ message: "Access denied" });
            }
        }
    });
    console.log("pass user middleware");
    next();
};

exports.adminMiddleware = (req, res, next) => {
    const id = req.user._id;
    User.findOne({ _id: id }).exec((error, user) => {
        if (error) {
            return res.status(400).json({ message: "admin not found" });
        }
        if (user) {
            if (user.role !== "admin") {
                return res.status(400).json({ message: "Access denied" });
            }
        }
    });
    next();
};
