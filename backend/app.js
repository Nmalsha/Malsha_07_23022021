

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const morgan = require ('morgan')
const mysql = require ('mysql2');
//const db = require('./models');
const jwt = require('jsonwebtoken');
//const userRoute = require ('./routes/user');
const path = require("path");
const models = require('./models');
const User = models.User;
const bcrypt = require('bcryptjs');
//const { REPL_MODE_SLOPPY } = require('repl');
//const modales = require('./models/user');

const app = express();

//db.sequelize.sync();

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


 //app.use ('/',userRoute);
// app.use ('/login',userRoute);


 // return res.json({
   
  //})
  /*
 app.get('/status',(req,res)=>{
     res.send({ message:"dxzsdxzd"
     })
 })
*/
  app.post('/signup',async(req, res) => {
    var email = JSON.stringify (req.body.email);
    var nom = JSON.stringify (req.body.nom);
    var prenom = JSON.stringify (req.body.prenom);
    var password = JSON.stringify (req.body.password);

if(email == null|| nom == null|| prenom == null||password == null ){
return res.status(400).json({ 'error': 'missing parameters'})
}
console.log(email,nom,prenom,password)


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
.then(()=> res.status(201).json({ message: 'user created !' }))
.catch(error => res.status(500).send({ message: error.message + 'Impossible de créer le compte!' }));

 })
 .catch(error => res.status(500).send({  message: error.message + 'create user unsuccessfyl' }));

}); /*
const User = models.User;

const user  = new User ({
    email:email,
        nom:nom,
        prenom:prenom,
        password:passwordhash,
        isAdmin:0
})


.catch (error){
    return res.status(500).json({'error': 'unable to verify user'});
 }

/*}

.then(function(userFound){

bcrypt.hash(password,5,function(error,bcryptedPassword){
    var newUser = modules.User.create({
        email:email,
        nom:nom,
        prenom:prenom,
        password:bcryptedPassword,
        isAdmin:0
    })
    console.log(newUser)
})



})

.catch (function(error){
   return res.status(500).json({'error': 'unable to verify user'});
})
 */   //res.json({ message: ` ${req.body.email} ,${req.body.nom},${req.body.prenom},${req.body.password}Votre login requête a bien été reçue !`  }); 

app.post('/login',(req, res) => {
    res.json({ message: ` ${req.body.email} Votre login requête a bien été reçue !`  }); 
});
  
 
module.exports = app;