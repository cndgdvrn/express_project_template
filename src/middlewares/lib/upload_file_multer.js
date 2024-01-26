const multer = require("multer");
const Custom_APIError = require("../../utils/api_error");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
  console.log(req.files)

    cb(null, "./public/multer");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "_" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});

const allowedMimetypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

const fileFilter = (req, file, cb) => {
  const isAllowedMimeType = allowedMimetypes.includes(file.mimetype);
  if (isAllowedMimeType) {
    return cb(null, true);
  }
  cb(
    new Custom_APIError(
      "Dosya png,jpeg,jpg veya gif formatında olmalıdır.",
      400
    )
  );
};

const limits = {
  fileSize: 1024 * 1024 * 2, // 2 mb
};

const upload = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
  limits: limits,
});

module.exports = { upload };
