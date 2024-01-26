const { verify_token } = require("../middlewares/validations/verify_token");
const {getMe, uploadPhoto}  = require("../controllers/user_controllers");
const { upload } = require("../middlewares/lib/upload_file_multer");
const router = require("express").Router();



router.get("/getMe",verify_token,getMe)
router.post("/upload",verify_token,upload.array("photo",6),uploadPhoto)



module.exports = router;



