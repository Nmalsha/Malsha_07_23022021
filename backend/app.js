

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const morgan = require ('morgan')
const mysql = require ('mysql2');

//const jwt = require('jsonwebtoken');
const userRoute = require ('./routes/user');
const path = require("path");
//const models = require('./models');
//const User = models.User;
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
// app.use ('/login',userRoute);


 // return res.json({
   
  //})
/*
 app.get('/status',(req,res)=>{
     res.send({ message:"dxzsdxzd"
     })
 })

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