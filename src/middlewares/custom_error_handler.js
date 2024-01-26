const multer = require("multer");
const { parseAPIError } = require("../helpers/handleError");
const Custom_APIError = require("../utils/api_error");

const custom_error_handler = (err, req, res, next) => {

  // return res.json({
  //   err:err.name
  // })
  
  if(err instanceof multer.MulterError){
    return res.json({
      success: false,
      message: err.message,
      name:err.name,
      field:err.field
    })
  }


  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: err.message || "Cast error !!!",
      name: err.name,
    });
  }

  if (err instanceof Custom_APIError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      name: err.name,
    });
  }

  return res.status(500).json({
    success: false,
    message:
      "Custom Error Handler içerisinde harici bir hata meydana geldi lütfen kontrol ediniz !!!!!!!!!!!!",
    err: parseAPIError(err),
  });
};

module.exports = custom_error_handler;
