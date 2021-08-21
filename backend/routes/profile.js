const express = require('express');
const userCtrl = require ('../controller/profile');
const router = express.Router();


router.get("/myprofile", userCtrl.getUserProfile);


module.exports = router;
