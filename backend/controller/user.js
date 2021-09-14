const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models");
const User = models.User;

exports.signup = async (req, res) => {
  var email = req.body.email;
  var nom = req.body.nom;
  var prenom = req.body.prenom;
  var password = req.body.password;

  if (email == null || nom == null || prenom == null || password == null) {
    return res.status(400).json({ error: "missing parameters" });
  }

  const userRes = await User.findOne({
    attributes: ["email"],
    where: { email: email },
  });

  if (userRes) {
    console.log("This email is already exist !!! please user different email");
  } else {
    //password hash
    const salt = await bcrypt.genSalt(10);
    bcrypt
      .hash(password, salt)
      .then((hash) => {
        const user = new User({
          email: email,
          nom: nom,
          prenom: prenom,
          password: hash,
          isAdmin: 0,
        });
        user
          .save()

          .then(function (user) {
            return res.status(201).json({
              userid: user.id,
            });
          })
          .catch((error) =>
            res.status(500).send({
              message: error.message + "Impossible de créer le compte!",
            })
          );
      })
      .catch((error) =>
        res
          .status(500)
          .send({ message: error.message + "create user unsuccessfyl" })
      );
  }
};

exports.login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  if (email == null || password == null) {
    return res.status(400).json({ error: "missing parameters" });
  }

  const findUser = await User.findOne({
    where: {
      email: email,
    },
  });
  console.log(findUser);
  if (!findUser) {
    return res
      .status(400)
      .json({ error: "Email or mot de passe incorrect ! " });
  }
  if (await bcrypt.compare(password, findUser.password)) {
    const user = {
      userId: findUser.id,
      nom: findUser.nom,
      prenom: findUser.prenom,
    };
    const token = jwt.sign(
      {
        userId: findUser.id,
        isAdmin: findUser.isAdmin,
      },
      "RANDOM_TOKEN_SECRET",
      { expiresIn: "24h" }
    );

    return res
      .status(200)

      .json({ status: "ok", token: token, userId: findUser.id });
  }
};
