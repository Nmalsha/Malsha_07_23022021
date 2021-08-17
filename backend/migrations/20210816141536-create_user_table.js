'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.createTable("user",{
      id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoincrement:true,
        primaryKey:true,
    },
    prenom : {
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
}
       
    },
    nom : {
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
}
   
},
email : {
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
        notEmpty:true
}

},
password : {
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
        notEmpty:true
}

},
isAdmin : {
    type:Sequelize.BOOLEAN

},
createdAt: {
  allowNull: false,
  type: Sequelize.DATE
},
updatedAt: {
  allowNull: false,
  type: Sequelize.DATE
},
    });
   
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.dropTable ("user");
  }
};
