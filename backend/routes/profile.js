const express = require("express");
const userCtrl = require("../controller/profile");
const router = express.Router();
//const  auth = require ('../middleware/auth')

router.get("/user", userCtrl.getUserProfile);
router.put("/user", userCtrl.updateUserProfile);

module.exports = router;
