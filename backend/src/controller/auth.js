const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

module.exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (err, user) => {
        if (err || user)
            return res.status(404).json({
                message: "User already registered",
            });

        const { firstName, lastName, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            username: shortid.generate(),
        });
        _user.save((err, data) => {
            if (err) {
                return res.status(404).json({
                    message: false,
                });
            }
            if (data) {
                return res.status(200).json({
                    message: true,
                });
            }
        });
    });
};

module.exports.signin = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            let checkPassword = user.authenticate(req.body.password);
            checkPassword.then((right) => {
                if (right) {
                    const token = jwt.sign(
                        { _id: user._id, role: user.role },
                        process.env.JWT_SECRET,
                        { expiresIn: "1d" }
                    );
                    res.cookie("token", token, { expiresIn: "1d" });
                    const {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName,
                    } = user;
                    return res.status(200).json({
                        user: {
                            _id,
                            firstName,
                            lastName,
                            email,
                            role,
                            fullName,
                        },
                        token: token,
                        message: true,
                    });
                } else {
                    return res.json({
                        message: false,
                        err: "wrong password",
                    });
                }
            });
        } else {
            return res.json({
                message: false,
                err: "wrong email",
            });
        }
    } catch (err) {
        console.log(err.response);
        return res.status(400).json({ message: false });
    }
};
