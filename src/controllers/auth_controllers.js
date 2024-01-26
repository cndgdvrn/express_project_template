const User = require("../models/user");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const Custom_APIError = require("../utils/api_error");
const Custom_APIResponse = require("../utils/api_response");
const {
  createToken,
  createTemprorayToken,
} = require("../helpers/tokenOperations");
const sendEmail = require("../middlewares/lib/send_mail");

//LOGIN OPERATION
const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Custom_APIError("Girmiş olduğunuz e-mail veya şifre hatalı", 401);
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Custom_APIError("Girmiş olduğunuz e-mail veya şifre hatalı", 401);
  }
  const token = createToken(user);
  return new Custom_APIResponse(token, "Giriş işlemi başarılı").success(res);
};

//REGISTER OPERATION
const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Custom_APIError("Bu email zaten kayıtlı", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = await User.create({ ...req.body, password: hashedPassword });
  return new Custom_APIResponse(
    newUser,
    "Kullanıcı başarıyla oluşturuldu"
  ).created(res);
};

//FORGET PASSWORD OPERATION
const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return new Custom_APIError("Böyle bir kullanıcı bulunamadı", 404);
  }

  const code = Math.round(Math.random() * 1e9).toString();
  const time = moment().add(5, "minute").format("YYYY-MM-DD HH:mm:ss");

  const updatedUser = await User.findOneAndUpdate(
    { email: user.email },
    {
      reset: {
        code: code,
        time: time,
      },
    },
    { new: true, runValidators: true }
  );

  sendEmail({
    from: process.env.SMTP_EMAIL,
    to: user.email,
    subject: "Şifre Sıfırlama İsteği",
    text: `Şifre Sıfırlama Kodunuz: ${code}`,
    html: `<h2>Kodunuz: <b>${code}<b/></h2>`,
  });

  return new Custom_APIResponse(
    updatedUser,
    "Sıfırlama kodu mailinize gönderilmiştir lütfen kontrol ediniz"
  ).success(res);
};

// CHECK FORGET PASSWORD CODE
const checkForgetPasswordCode = async (req, res, next) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Custom_APIError("Böyle bir kullanıcı bulunamadı", 401);
  }

  const resetCodeDbTime = user.reset.time;
  const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  const diffTime = moment(resetCodeDbTime).diff(moment(currentTime), "seconds");

  if (diffTime <= 0)
    throw new Custom_APIError(
      "İstenilen süre içerisinde kodu girmediniz, lütfen tekrar deneyin",
      401
    );

  if (code !== user.reset.code) throw new Custom_APIError("Geçersiz kod", 401);

  const temproraryToken = createTemprorayToken(user);

  return new Custom_APIResponse(
    temproraryToken,
    "Kod geçerli, lütfen token ile birlikte parolanızı sıfırlayınız"
  ).success(res);
};

//RESET PASSWORD
const resetPassword = async (req, res, next) => {
  const { token, password } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_TEMPRORAY_SECRET_KEY);

  if (!decoded) throw new Custom_APIError("Geçersiz token", 401);

  const user = await User.findOne({ email: decoded.email });

  if (!user) throw new Custom_APIError("Böyle bir kullanıcı bulunamadı", 401);

  user.password = await bcrypt.hash(password, 8);
  user.reset = {
    code: null,
    time: null,
  };

  const updatedUser = await user.save();
  console.log(updatedUser);
  return new Custom_APIResponse(
    updatedUser,
    "Şifre başarıyla değiştirildi"
  ).success(res);
};

module.exports = {
  login,
  register,
  forgetPassword,
  checkForgetPasswordCode,
  resetPassword,
};
