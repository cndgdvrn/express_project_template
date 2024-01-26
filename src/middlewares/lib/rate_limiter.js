const { rateLimit } = require("express-rate-limit");
const Custom_APIError = require("../../utils/api_error");
const isAdmin = require("../validations/admin_role_check");

//PASS THE MIDDLEWARE TO FORGET-RESET PASSWORD ROUTE
const rateLimiter = rateLimit({
  windowMs: 1000 * 60 * 10,
  limit:async(req,res)=>{
    return isAdmin(2)
  },
  standardHeaders: true,
  legacyHeaders: false,
  message: "Çok fazla istekte bulundunuz lütfen daha sonra tekrar deneyin",
  handler: (req, res, next, options) => {
    // console.log(options);
    throw new Custom_APIError(options.message, options.statusCode);
  },
});

module.exports = {rateLimiter}


