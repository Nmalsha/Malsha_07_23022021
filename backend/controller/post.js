const models = require("../models");
const jwt = require("jsonwebtoken");

exports.createPost = (req, res) => {
  const token = req.headers.token;
  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
    const userId = decoded.id;

    const title = req.body.title;
    const content = req.body.content;
    const attachment = req.file;
    const likes = req.body.likes;
  });
};

exports.getAllPost = (req, res) => {};
