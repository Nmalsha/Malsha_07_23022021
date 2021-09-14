const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models");
//const fs = require("fs");
const User = models.User;
const Post = models.Post;
const Comment = models.Comment;

exports.getUserProfile = async (req, res, next) => {
  const token = req.headers.token;

  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });

    const findUser = User.findOne({
      where: {
        id: decoded.userId,
      },
    }).then(function (findUser) {
      return res.status(201).json({
        findUser,
      });
    });
  });
};

exports.updateUserProfile = async (req, res, next) => {
  console.log(req.body.user);
  const editProfileObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        profileimage: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...JSON.parse(req.body.user),
      };

  const token = req.headers.token;

  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
    const userId = decoded.userId;

    if (userId === editProfileObject.id) {
      User.update(
        {
          ...editProfileObject,
        },
        { where: { id: userId } }
      )
        .then(() =>
          res.status(201).json({ message: "user updated", editProfileObject })
        )
        .catch((error) => res.status(400).json({ error: error }));
    } else {
      throw new Error("403: unauthorized request");
    }
  });
};

exports.deleteProfile = async (req, res) => {
  const token = req.headers.token;
  console.log("i am here");
  console.log(req.params.id);

  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
    const userId = decoded.userId;
    console.log(req.params.id);
    if (userId == req.params.id) {
      console.log("userId OK");
      const allpost = Post.findAll({
        where: {
          userId: req.params.id,
        },
      }).then((allpostNew) => {
        allpostNew.forEach((element) => {
          console.log("Post to delete : " + element.id);

          // delete comments.
          Comment.destroy({
            where: {
              postId: element.id,
            },
          });

          // delete post
          element.destroy();
        });
      });

      // delete user
      User.destroy({
        where: {
          id: userId,
        },
      })

        .then((res) => res.status(201).json({ message: "objet supprimé!" }))
        .catch((error) =>
          res.status(200).json({
            message: "objet supprimé!",
          })
        );
    }
  });
};

exports.getappropiateUser = (req, res) => {
  const appropiateUser = req.params.id;
  console.log(appropiateUser);
  const gotUser = User.findOne({
    where: {
      id: appropiateUser,
    },
  })
    .then((gotUser) =>
      res.status(201).json({ message: "objet trouvé!", gotUser })
    )

    .catch((error) => res.status(500).json({ message: error.message }));
};
