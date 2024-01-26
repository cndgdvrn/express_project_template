const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
      algorithm: "HS256",
    }
  );
  return {
    token,
  };
};

const createTemprorayToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_TEMPRORAY_SECRET_KEY,
    {
      algorithm: "HS256",
      expiresIn: process.env.JWT_TEMPRORAY_EXPIRES_IN,
    }
  );
  return token
};

module.exports = { createToken,createTemprorayToken };
