const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const morgan = require("morgan");
const mysql = require("mysql2");

const jwt = require("jsonwebtoken");
const userRoute = require("./routes/user");
const profileRoute = require("./routes/profile");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");
const path = require("path");
//const { JsonWebTokenError } = require('jsonwebtoken');
//const { User } = require('./models');
const models = require("./models");
const decode = require("jsonwebtoken/decode");
const User = models.User;
const Post = models.Post;
//const bcrypt = require('bcryptjs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/", userRoute);
app.use("/", profileRoute);
app.use("/", postRoute);
//app.use("/onepost", postRoute);
app.use("/", commentRoute);

app.get("/postid/:id", async (req, res, next) => {
  console.log(req.params.id);

  const findPost = await Post.findOne({
    where: { id: req.params.id },
  })

    // res.send({data:sauce});
    .then(function (findPost) {
      console.log(findPost);
      return res.status(201).json({ message: "your post is found", findPost });
    })
    .catch((error) => res.status(401).json({ error }));
});

/*
app.get('/user', async (req,res,next)=>{
const token = req.headers.token;
//console.log(token)
jwt.verify(token,'RANDOM_TOKEN_SECRET',(err,decoded)=>{
    console.log(decoded.userId)
    //if token is invalide
    if(err) return res.status(401).json({
  title : 'unauthorized'
  })
  //console.log(decoded.userId)
  const findUser =  User.findOne({
      where: {
           id: decoded.userId
            }
        })

.then(function(findUser){
    console.log(findUser);
    return res.status(201).json({
        findUser
            })
        })
    })
})
*/
module.exports = app;
