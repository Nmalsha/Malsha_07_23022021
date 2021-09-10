const express = require("express");
const userCtrl = require("../controller/profile");
const router = express.Router();
//const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.get("/user", userCtrl.getUserProfile);
router.put("/user", multer, userCtrl.updateUserProfile);
router.delete("/user/:id", multer, userCtrl.deleteProfile);
router.get("/user/:id", userCtrl.getappropiateUser);
module.exports = router;
