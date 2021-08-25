const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require('../models');
const User = models.User;
//const auth = require('../middleware/auth');
/*
exports.getUserProfile = (req,res)=>{
  const token = req.headers.token;
  //console.log(token)
  jwt.verify(token,'RANDOM_TOKEN_SECRET',(err,decoded)=>{
      //if token is invalide
      if(err) return res.status(401).json({
    title : 'unauthorized'
    })
    console.log(decoded.userId)
  
    const findUser =  User.findOne({
  where :{
      id: decoded.userId
  }
  
    })
    console.log(findUser);
  
      //if token valide
      //  User.findOne({where: { id: decoded.userId }},(err,user)=>{
      //     console.log(user)
  //return res.status(200).json({
  //     title:'user grabbed',
  //     user
  // })
  
      // })
  
  
   
      })
        
            
        }
*/
// exports.getUserProfile = async(req, res) => {
//   const token = req.headers.token;
//   console.log(token);
  // jwt.verify(token , RANDOM_TOKEN_SECRET,(err,decoded)=>{
  //   // if(err) return res.status(401).json({
  //   //   title : 'unauthorized'
  //   // })
  //   res.send({token
  //     })
  // })
//res.send({token
// });


 //}
