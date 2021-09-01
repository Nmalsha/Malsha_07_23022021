const express = require("express");
const postCtrl = require("../controller/post");
const router = express.Router();
const multer = require("../middleware/multer-config");

router.post("/post", multer, postCtrl.createPost);

module.exports = router;
