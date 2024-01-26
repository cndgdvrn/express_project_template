const express = require("express");
const router = express.Router();
const {login,register, forgetPassword, checkForgetPasswordCode, resetPassword} = require("../controllers/auth_controllers");
const { register_validation, login_validation } = require("../middlewares/validations/auth_validation");


router.post("/login",login_validation,login)

router.post("/register",register_validation,register)


router.post("/forget-password",forgetPassword)

router.post("/check-forget-password-code",checkForgetPasswordCode)

router.post("/reset-password",resetPassword)


module.exports = router; 