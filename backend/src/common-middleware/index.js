const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        const user = jwt.verify(token, process.env.JWT_SECRET); // submit token to show profile
        req.user = user;
        console.log("toten: ", token);
    } else {
        return res.status(400).json({ message: "Authorization required" });
    }
    console.log("pass requireSignin");
    next();
};

exports.userMiddleware = async (req, res, next) => {
    try {
        const id = req.user._id;
        let user = await User.findOne({ _id: id });
        if (user) {
            if (user.role !== "user") {
                return res.status(400).json({ message: "Access denied" });
            }
        } else {
            return res.status(400).json({ message: "user not found" });
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
    next();
};

exports.adminMiddleware = async (req, res, next) => {
    try {
        const id = req.user._id;
        let user = await User.findOne({ _id: id });
        if (user) {
            if (user.role !== "admin") {
                return res.status(400).json({ message: "Access denied" });
            }
        } else {
            return res.status(400).json({ message: "admin not found" });
        }
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
    next();
};
