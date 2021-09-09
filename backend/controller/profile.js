const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models");
//const fs = require("fs");
const User = models.User;
const Post = models.Post;
// const multer = require("multer");
// const upload = multer("../");

exports.getUserProfile = async (req, res, next) => {
  const token = req.headers.token;
  //console.log(token);
  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
    //console.log(decoded.userId);
    //if token is invalide
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    //console.log(decoded.userId)
    const findUser = User.findOne({
      where: {
        id: decoded.userId,
      },
    }).then(function (findUser) {
      // console.log(findUser);
      return res.status(201).json({
        findUser,
      });
    });
  });
};

exports.updateUserProfile = async (req, res, next) => {
  /**
   * On test les entrées
   */
  //console.table(req.file);
  //console.table(req.body.user);
  /** Fin test */
  const editProfileObject = req.file
    ? {
        ...JSON.parse(req.body.user),
        profileimage: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body.user,
      };

  const token = req.headers.token;
  /** Ici le token est en dur */

  //console.log(editProfileObject);

  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
    const userId = decoded.userId;

    //console.log("userId: " + userId);

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
  console.log(req.headers.id);

  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
    const userId = decoded.userId;
    console.log(userId);

    User.findOne({
      where: {
        id: req.params.id,
      },
    }).then((user) => {
      const filename = user.profileimage.split("/images")[1];
      console.log(user);
      console.log(filename);

      User.destroy({
        where: {
          id: req.params.id,
        },
      })

        .then(() => res.status(201).json({ message: "objet supprimé!" }))
        .catch((error) => res.status(500).json({ message: error.message }));
    });
  });
};
