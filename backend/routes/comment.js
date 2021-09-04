const express = require("express");
const commentCtrl = require("../controller/comment");
const router = express.Router();

router.post("/comment", commentCtrl.createComment);

module.exports = router;
