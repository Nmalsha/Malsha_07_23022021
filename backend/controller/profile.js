const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models");
//const { col } = require("sequelize/types");
const User = models.User;
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

  //console.log("Token en dur" + token);

  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
    const userId = decoded.userId;
    /** !TODO
     * On arrive pas a get le token.
     * Vérifier pourquoiça ne fonctionne pas.
     */
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
