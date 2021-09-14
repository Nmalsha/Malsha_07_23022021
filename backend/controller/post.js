const models = require("../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Post = models.Post;
const User = models.User;
const Comment = models.Comment;

exports.createPost = async (req, res) => {
  /*
  console.log(req.body.post);
  const postObject = JSON.parse(req.body.post);

  const post = {
    content: postObject.content,
    attachement: "",
    userId: postObject.userid,
  };
  //console.log(req.file);
  if (req.file) {
    post.attachement = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }

  //create new post
  post
    .save()
    .then((data) => {
      res.status(201).json({ message: "Post créé !" });
    })
    .catch((error) => res.status(500).json({ error }));
*/

  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        attachement: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body.post,
      };

  const token = req.headers.token;

  console.log(postObject);
  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
    const userId = decoded.userId;

    if (postObject.content == null) {
      return res.status(400).json({ error: "your post is empty" });
    }

    const getUserFromDb = User.findOne({
      where: { id: userId },
    });

    if (!getUserFromDb) {
      return res
        .status(400)
        .json({ error: "Email or mot de passe incorrect ! " });
    } else {
      const post = new Post({
        attachement: postObject.attachement,
        content: postObject.content,
        userId: postObject.userId,
      });
      if (req.file) {
        postObject.attachement = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      }
      post.save().then(function (post) {
        console.log(post);
        return res
          .status(201)
          .json({ message: "your post successfully created" });
      });
    }
  });
};

exports.getAllPost = (req, res) => {
  console.log("getAllPost");

  Post.findAll({
    order: [["createdAt", "DESC"]],
    include: User,
  }).then((Post) =>
    res.status(201).json({
      Post,
      message: "got all post",
    })
  );
};

exports.getOnePost = async (req, res, next) => {
  console.log("toto");
};

exports.getAllPostsForOneUser = async (req, res, next) => {
  const token = req.headers.token;

  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
    const userId = decoded.userId;
    console.log(userId);
    const postsforOneUser = Post.findAll({
      where: { userId: userId },
    }).then((postsforOneUser) =>
      res.status(201).json({
        postsforOneUser,

        message: "got all post created by One user",
      })
    );
  });
};

exports.editPost = async (req, res) => {
  const editPost = req.file
    ? {
        content: JSON.parse(req.body.post).content,
        id: JSON.parse(req.body.post).id,
        attachement: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        content: JSON.parse(req.body.post).content,
        id: JSON.parse(req.body.post).id,
      };

  const token = req.headers.token;

  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
    const userId = decoded.userId;
    console.log(userId);
    console.log({ ...editPost });

    Post.update(
      {
        ...editPost,
      },
      { where: { id: editPost.id } }
    )
      .then((editPost) =>
        res.status(201).json({ message: "post updated", editPost })
      )
      .catch((error) => res.status(400).json({ error: error }));
  });
};

exports.deletePost = (req, res, next) => {
  console.log(req.params.id);

  console.log(req.headers.id);
  Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      const filename = post.attachement.split("/images")[1];
      console.log(post);
      console.log(filename);

      fs.unlink(`app/images/${filename}`, (err) => {
        return err ? console.log(err) : console.log("image supprimée !");
      });
      return Post.destroy({ where: { id: req.params.id } })

        .then(() => res.status(201).json({ message: "objet supprimé!" }))
        .catch((error) => res.status(500).json({ message: error.message }));
    })

    .catch((error) => res.status(500).json({ message: error.message }));
};

exports.getOtherUserPost = async (req, res) => {
  console.log(req.params.id);
  const getOtherUserPosts = Post.findAll({
    order: [["createdAt", "DESC"]],
    where: { userId: req.params.id },
  })
    .then((gotUserPost) =>
      res.status(201).json({ message: "posts trouvé!", gotUserPost })
    )
    .catch((error) => res.status(500).json({ message: error.message }));
};
