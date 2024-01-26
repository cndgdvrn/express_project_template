const User = require("../models/user");
const Custom_APIResponse = require("../utils/api_response");

const getMe = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });
  return new Custom_APIResponse({ user }).success(res);
};

const uploadPhoto = (req, res, next) => {
  
  return new Custom_APIResponse(message="Resim yükleme işlemi başarılı").success(
    res
  );
};

module.exports = {
  getMe,
  uploadPhoto
};
