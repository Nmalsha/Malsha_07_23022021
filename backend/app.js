

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const morgan = require ('morgan')
const mysql = require ('mysql2');

const jwt = require('jsonwebtoken');
const userRoute = require ('./routes/user');
//const profileRoute = require('./routes/profile');
const path = require("path");
//const { JsonWebTokenError } = require('jsonwebtoken');
//const { User } = require('./models');
const models = require('./models');
const decode = require('jsonwebtoken/decode');
const User = models.User;
//const bcrypt = require('bcryptjs');


const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.options('*',cors());

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


 app.use ('/',userRoute);
 //app.use ('/user',profileRoute);


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

// return res.status(200).json({
//   finduser
//   })
// 
// console.log(findUser.email)
// return res.status(200).json({
//     finduser
// })
//console.log(findUser)

/*
if(!user){
    return res
    .status(400)
    .json({ error: "can not find user ! " });

}else{
user:{
    userId:findUser.id;
    nom:findUser.nom;
    prenom:findUser.prenom;
    email:findUser.email;
    }
}
*/


/*
  User.findOne({where: { id: decoded.userId }},(err,user)=>{
    if(err) console.log(err);
    console.log(user);

  })
  */
})
      
          
})



/*


  app.post('/signup',async(req, res) => {
    var email = JSON.stringify (req.body.email);
    var nom = JSON.stringify (req.body.nom);
    var prenom = JSON.stringify (req.body.prenom);
    var password = JSON.stringify (req.body.password);

if(email == null|| nom == null|| prenom == null||password == null ){
return res.status(400).json({ 'error': 'missing parameters'})
}

console.log(email,nom,prenom,password)
/*
function userFound (){
    User.findOne({
    attributes: ['email'],
    where: { email: email }
  })


}
  */
 /* 
//password hash
const salt = await bcrypt.genSalt(10);
 bcrypt.hash(password,salt)
 .then(hash =>{
    console.log(hash);
const user = new User({
    email:email,
        nom:nom,
        prenom:prenom,
        password:hash,
        isAdmin:0
}) ;
user.save()
 console.log('user created')
 console.log(user)
.then(function(user) {
    return res.status(201).json({
        'userid':user.id
    })
    console.log(user.id)
})
.catch(error => res.status(500).send({ message: error.message + 'Impossible de créer le compte!' }));

 })
 .catch(error => res.status(500).send({  message: error.message + 'create user unsuccessfyl' }));

}); 
app.post('/login',async (req, res) => {
    var email = JSON.stringify (req.body.email);
    var password = JSON.stringify (req.body.password);

    if(email == null||password == null ){
        return res.status(400).json({ 'error': 'missing parameters'})
        }
      

       const findUser = await User.findOne({
            where:{
                email:email,
            }
        })
        console.log(findUser.email)
if(!findUser){
    return res
    .status(400)
    .json({ error: "Email ou mot de passe incorrect ! " });
}
 if(await bcrypt.compare(password,findUser.password)){
console.log(findUser.id)
const token = jwt.sign({
    userId:findUser.id,
    email:findUser.email,
},
'RANDOM_TOKEN_SECRET',
{expiresIn:'24h'}
)
console.log('user login success')
console.log(token)
return res
    .status(400)
    .json({ status:'ok',token:token,userId:findUser.id });
 }
      
    })
*/
 
module.exports = app;