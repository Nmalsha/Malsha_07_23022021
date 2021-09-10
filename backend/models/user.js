"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsTo(models.Post, { foreignKey: "userId" });
      //models.User.belongsTo(models.Post, { as: "post" });
      models.User.hasMany(models.Post, {
        onDelete: "cascade",
        foreignKey: "userId",
      });
      //models.User.hasOne(models.AuthoriseDate, { foreignKey: 'userId' });
      /*models.Post.belongsTo(models.User, {
        foreignKey: "userId",
      });*/
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      nom: DataTypes.STRING,
      prenom: DataTypes.STRING,
      password: DataTypes.STRING,
      profileimage: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
