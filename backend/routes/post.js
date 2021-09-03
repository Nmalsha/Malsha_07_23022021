const express = require("express");
const postCtrl = require("../controller/post");
const router = express.Router();
const multer = require("../middleware/multer-config");

router.post("/post", multer, postCtrl.createPost);
router.get("/post", multer, postCtrl.getAllPost);
router.get("/post/:id", multer, postCtrl.getOnePost);
module.exports = router;
