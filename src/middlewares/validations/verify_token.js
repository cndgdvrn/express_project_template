const jwt = require("jsonwebtoken");
const Custom_APIError = require("../../utils/api_error");

const verify_token = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new Custom_APIError("Token bulunamadı, lütfen giriş yapınız", 401);
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY,(err,decoded)=>{
    if(err){
      throw new Custom_APIError("Token geçersiz",401)
    }
    req.user = decoded
    next()
  })

};

module.exports = { verify_token };
