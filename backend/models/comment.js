"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comment.belongsTo(models.Post, { foreignKey: "postId" });
    }
    /*
    static associate(models) {
     models.Post.belongsTo(models.User, { foreignKey: "userId" });
      models.Post.hasMany(models.Comment, {
        onDelete: "cascade",
        foreignKey: "userId",
      });
    }
    */
  }
  Comment.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
