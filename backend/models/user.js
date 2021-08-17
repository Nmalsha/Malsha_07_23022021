/*

'user strict';
const Sequelize = require('sequelize');


module.exports = (sequelize,DataTypes) => {

const user = sequelize.define("user",{
    email: DataTypes.STRING,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
});
return user;
}
*/