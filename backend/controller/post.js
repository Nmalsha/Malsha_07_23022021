const models = require("../models");
const jwt = require("jsonwebtoken");
const Post = models.Post;
const User = models.User;
const Comment = models.Comment;

exports.createPost = async (req, res) => {
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
  //console.log(token);
  console.log(postObject);
  jwt.verify(token, "RANDOM_TOKEN_SECRET", (err, decoded) => {
    const userId = decoded.userId;
    //console.log(userId);
    //const content = req.body.post;
    //console.log(content);
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
      //console.log(getUserFromDb.data)

      const post = new Post({
        attachement: postObject.attachement,
        content: postObject.content,
        userId: postObject.userId,
      });
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
  Post.findAll({
    order: [["createdAt", "DESC"]],
    include: User,
    //include: Comment,
  }).then((Post) =>
    res.status(201).json({
      Post,
      message: "got all post",
    })
  );
};

exports.getOnePost = async (req, res, next) => {
  console.log("toto");
  //console.log(req.params.id);
  // const getOnPost = Post.findOne({
  //   _id: req.params.id,
  // })
  //   .then((getOnPost) => res.status(200).json(getOnPost))
  //   .catch((error) => res.status(400).json({ error }));
};

exports.getAllPostsForOneUser = async (req, res, next) => {
  const token = req.headers.token;

  //console.log(req.params.id);
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
  console.table(req.file);
  console.log(req.body.post);

  const editPost = req.file
    ? {
        content: JSON.parse(req.body.post).content,
        id: JSON.parse(req.body.post).id,
        attachement: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body.post,
      };

  const token = req.headers.token;

  console.log(editPost.id);

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
  Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((post) => {
      const filename = post.imageUrl.split("/images")[1];
      console.log(filename);

      fs.unlink(`images/${filename}`, () => {
        Post.destroy({
          where: {
            id: req.params.id,
          },
        })
          .then(() => res.status(201).json({ message: "objet supprimé!" }))
          .catch((error) => res.status(400).json({ error: error }));
      });
    })

    .catch((error) => res.status(400).json({ error: error }));
};

/*
exports.editPost = async (req, res) => {
  console.table(req.file);
  console.log(req.body.post.content);

  const editPost = req.file
    ? {
        content: JSON.parse(req.body.post).content,
        id: JSON.parse(req.body.post).id,
        attachement: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : {
        ...req.body.post,
      };

  const token = req.headers.token;

  // console.log({ editPost });

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
*/
