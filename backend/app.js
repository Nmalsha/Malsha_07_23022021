

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const morgan = require ('morgan')
const mysql = require ('mysql2');
//const db = require('./models');
const jwt = require('jsonwebtoken');
const userRoute = require ('./routes/user');
const path = require("path");
const user = require('./models/user');
const bcrypt = require('bcryptjs');

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


app.use ('/signup',userRoute);
app.use ('/login',userRoute);


 // return res.json({
   
  //})
  /*
 app.get('/status',(req,res)=>{
     res.send({ message:"dxzsdxzd"

     })
 })
 */
  app.post('/signup',(req, res) => {
    res.json({ message: `${req.body.email}Votre signup  requête a bien été reçue !` }); 
});
app.post('/login',(req, res) => {
    res.json({ message: ` ${req.body.email} Votre login requête a bien été reçue !`  }); 
});
  

module.exports = app;