const Joi = require("joi");
const Custom_APIError = require("../../utils/api_error");

const emailValidator = Joi.string()
  .email()
  .messages({
    "string.empty": "E-posta alanının doldurulması zorunludur",
    "string.email": "E-posta formatını doğru giriniz",
  })
  .custom((value, helpers) => {
    const atIndex = value.indexOf("@");
    if (atIndex < 0 || atIndex < 2) {
      return helpers.message(
        "E-posta adresiniz @ ifadesinden önce minimum (2) karakter olmalıdır"
      );
    }
    return value;
  }, "custom email");

const register_schema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.empty": "İsim alanının doldurulması zorunludur",
    "string.min": "İsim minimum (2) karakter olmak zorundadır",
  }),
  lastname: Joi.string().min(2).max(30).required().messages({
    "string.empty": "Soyisim alanının doldurulması zorunludur",
    "string.min": "Soyisim minimum (2) karakter olmak zorundadır",
  }),
  email: emailValidator.required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .messages({
      "string.empty": "Şifre alanının doldurulması zorunludur",
      "string.min": "Şifre minimum (6) karakter olmak zorundadır",
      "string.max": "Şifre maksimum (30) karakter olmak zorundadır",
      "string.pattern.base": "Şifre sadece harf ve rakam içermelidir",
    }),
});

const login_schema = Joi.object({
  email: emailValidator.required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
    .messages({
      "string.empty": "Şifre alanının doldurulması zorunludur",
      "string.min": "Şifre minimum (6) karakter olmak zorundadır",
      "string.max": "Şifre maksimum (30) karakter olmak zorundadır",
      "string.pattern.base": "Şifre sadece harf ve rakam içermelidir",
    }),
});


//REGISTER VALIDATION
const register_validation = (req, res, next) => {
  const { error } = register_schema.validate(req.body);
  if (error) {
    throw new Custom_APIError(error.details[0].message, 400);
  }
  next();
};

//LOGIN VALIDATION
const login_validation = (req, res, next) => {
  const { error } = login_schema.validate(req.body);
  if (error) {
    throw new Custom_APIError(error.details[0].message, 400);
  }
  next();
};

module.exports = { register_validation, login_validation };
