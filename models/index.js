const sequelize = require("../config/sequelize");
const Product = require("./Product");
const User = require("./User");
const Article = require("./Article");


module.exports = {
  sequelize,
  Product,
  User,
  Article
};
