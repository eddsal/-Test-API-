const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Article extends Model {}

Article.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

Article.sync({
	alter: true
});


module.exports = Article;
