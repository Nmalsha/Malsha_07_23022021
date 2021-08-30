const express = require("express");
const userCtrl = require("../controller/profile");
const router = express.Router();
//const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/user", userCtrl.getUserProfile);
router.put("/user", multer, userCtrl.updateUserProfile);

module.exports = router;
