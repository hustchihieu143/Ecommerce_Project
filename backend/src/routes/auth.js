const express = require("express");
const router = express.Router();
const controller = require("../controller/auth");
const {
    validateSignupRequest,
    isRequestValidated,
    validateSigninRequest,
} = require("../validators/auth");

router.post(
    "/signin",
    validateSigninRequest,
    isRequestValidated,
    controller.signin
);

router.post(
    "/signup",
    validateSignupRequest,
    isRequestValidated,
    controller.signup
);

// router.post("/profile", controller.requireSignin, (req, res) => {
//     res.status(200).json({
//         user: "profile",
//     });
// });


module.exports = router;
