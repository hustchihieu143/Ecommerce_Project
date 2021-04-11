const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/auth");
const {
    validateSignupRequest,
    isRequestValidated,
    validateSigninRequest,
} = require("../../validators/auth");

const { requireSignin } = require("../../common-middleware/index.js");

router.post(
    "/admin/signin",
    validateSigninRequest,
    isRequestValidated,
    controller.signin
);

router.post(
    "/admin/signup",
    validateSignupRequest,
    isRequestValidated,
    controller.signup
);

// router.post('/profile', controller.requireSignin, (req, res) => {
//     res.status(200).json({
//         user: 'profile'
//     });
// })

router.post("/admin/signout", requireSignin, controller.signout);

module.exports = router;
