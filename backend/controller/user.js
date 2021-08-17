const user = require('../models/user');
const jwt = require("jsonwebtoken");
//const db = require("../models");

//const User = db.user;

exports.signup = async(req, res) => {
    res.json({ message: 'Votre signup requête a bien été reçue !' });
};

exports.login = async(req, res) => {
    res.json({ message: 'Votre login requête a bien été reçue !' }); 
};
