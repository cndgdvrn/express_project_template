const router = require("express").Router();
const auth_routes = require("./auth_routes.js")
const user_routes = require("./user_routes.js")

router.use("/auth",auth_routes)
router.use("/user",user_routes)



module.exports = router;