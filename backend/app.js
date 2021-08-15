const express = require('express');
const cors = require('cors');
const app = express();

const jwt = require('jsonwebtoken');

app.use(cors());
app.options('*',cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/*
app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});*/
app.post('/signup',(req, res) => {
    res.json({ message: 'Votre signup requête a bien été reçue !' }); 
});
app.post('/login',(req, res) => {
    res.json({ message: 'Votre login requête a bien été reçue !' }); 
});
module.exports = app;