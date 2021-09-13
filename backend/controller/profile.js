const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models");
//const fs = require("fs");
const User = models.User;
const Post = models.Post;
const Comment = models.Comment;
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

/*
exports.deleteProfile = (req, res) => {
  const deletedUser = req.params.id;

  User.findOne({
    where: { id: deletedUser },
  })
    .then((user) => {
    
      Post.findAll({
        where: { userId: deletedUser },
      })
        .then((post) => {
          Comment.findAll({
            where: { userId: deletedUser },
          })
            .then(() => {
              User.destroy({
                where: {
                  id: deletedUser,
                },
              })
                .then((destroyed) => {
                  for (const posts of post) {
                    if (posts.imageUrl != null) {
                      const fileName = posts.attachement.split("/images/")[1];
                      fs.unlink(`images/${fileName}`, () => {
                        if (!destroyed) {
                          throw error;
                        } else {
                          // Si il n'y a pas d'erreur alors, l'erreur unlink est réussi
                          console.log("File deleted!");
                        }
                      });
                    } else {
                      if (!destroyed) {
                        throw error;
                      } else {
                        // Si il n'y a pas d'erreur alors, l'erreur unlink est réussi
                        console.log("File deleted!");
                      }
                    }
                  }

                  res.status(200).json({ message: "Utilisateur supprimée !" });
                })
                .catch((error) => {
                  console.error(error.message);
                  return res
                    .status(500)
                    .json({ error: "Ici, Internal error !" });
                });
            })
            .catch((error) => {
              console.error(error.message);
              return res
                .status(404)
                .json({ error: "Commentaires introuvable" });
            });
        })
        .catch((error) => {
          console.error(error.message);
          return res.status(404).json({ error: "Post introuvable" });
        });
    })
    .catch((error) => {
      console.error(error.message);
      return res.status(403).json({ error: "Utilisateur n'existe pas !" });
    });
};
*/

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
        //console.log(allpostNew);
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

        //res.redirect("/");
        // TODO
        .then((res) => res.status(201).json({ message: "objet supprimé!" }))
        .catch((error) =>
          res.status(200).json({
            //message: error.message
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
