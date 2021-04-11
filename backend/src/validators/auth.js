const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
    check("firstName").notEmpty().withMessage("firstName is required"),
    check("lastName").notEmpty().withMessage("lastName is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at leats 6 characters long"),
];

exports.validateSigninRequest = [
    check("email").isEmail().withMessage("Valid email is required"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at leats 6 characters long"),
];

exports.isRequestValidated = (req, res, next) => {
    console.log("isRequestValidated");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()[0].msg });
    } else next();
};
