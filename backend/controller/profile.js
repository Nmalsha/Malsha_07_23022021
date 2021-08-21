const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require('../models');
const User = models.User;
const auth = require('../middleware/auth');

exports.getUserProfile = async(req, res) => {
  var headerAuth = req.headers['authorization']
    console.log(headerAuth)





}
