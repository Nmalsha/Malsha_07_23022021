"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const mysql = require("mysql2");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const user = (db.User = require("./user")(sequelize, Sequelize));
const post = (db.Post = require("./post")(sequelize, Sequelize));
const comment = (db.Comment = require("./comment")(sequelize, Sequelize));

post.belongsTo(user);

comment.belongsTo(post);
comment.belongsTo(user);

post.belongsTo(user, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
post.belongsToMany(user, {
  through: comment,
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
  allowNull: false,
});
user.belongsToMany(post, {
  through: comment,
  foreignKey: "postId",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
  allowNull: false,
});
comment.belongsTo(user, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
comment.belongsToMany(user, {
  through: comment,
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
  allowNull: false,
});
user.belongsToMany(comment, {
  through: comment,
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
  allowNull: false,
});

// Posts et Comments
post.hasMany(comment);
comment.belongsTo(post, {
  foreignKey: {
    name: "postId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

//post.hasMany(comment, { foreignKey: "postId" });
//comment.hasOne(user, { foreignKey: "userId" });

module.exports = db;
