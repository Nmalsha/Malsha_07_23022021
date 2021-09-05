const models = require("../models");
const jwt = require("jsonwebtoken");
const Post = models.Post;
const User = models.User;
const Comment = models.Comment;

exports.createComment = async (req, res) => {
  const token = req.body.headers.token;
  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
    const userId = decoded.userId;

    var comment = JSON.stringify(req.body.comment);

    console.log(userId);
    console.log(comment);
  });
};
