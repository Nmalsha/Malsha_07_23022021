const models = require("../models");
const jwt = require("jsonwebtoken");
const Post = models.Post;
const User = models.User;
const Comment = models.Comment;

exports.createComment = async (req, res) => {
  const token = req.headers.token;

  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
    const userId = decoded.userId;

    const comment = new Comment({
      comment: req.body.comment,
      postId: req.body.postId,
      userId: userId,
    });
    comment.save().then(function (comment) {
      console.log(comment);
      return res
        .status(201)
        .json({ message: "your comment successfully created" });
    });
  });
};
exports.getAllComment = (req, res) => {
  Comment.findAll({
    order: [["createdAt", "DESC"]],
    include: [Post, User],
  }).then((Comment) =>
    res.status(200).json({
      Comment,
      message: "got all comments",
    })
  );
};
