const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

module.exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (err, user) => {
        if (err || user)
            return res.status(404).json({
                message: "Admin already registered",
            });

        const { firstName, lastName, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            username: shortid.generate(),
            role: "admin",
        });
        _user.save((err, data) => {
            if (err) {
                return res.status(404).json({
                    message: "something went wrong",
                });
            }
            if (data) {
                return res.status(200).json({
                    message: "admin create successfully",
                });
            }
        });
    });
};

module.exports.signin = (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (err) {
            return res.status(404).json({
                message: err.message,
            });
        }

        if (user) {
            if (user.authenticate(req.body.password) && user.role === "admin") {
                const token = jwt.sign(
                    {
                        _id: user._id,
                        role: user.role,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "1d" }
                );
                res.cookie("token", token, { expiresIn: "1d" });
                const { _id, firstName, lastName, email, role, fullName } =
                    user;
                return res.status(200).json({
                    user: { _id, firstName, lastName, email, role, fullName },
                    token: token,
                });
            } else {
                return res.status(400).json({
                    message: "something went wrong",
                });
            }
        } else {
            return res.status(404).json({
                message: "Something went wrong",
            });
        }
    });
};

module.exports.signout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message: "Signout was successful...",
    });
};
