'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsTo(models.Category, {
        foreignKey: "CategoryId"
      })
    }
  }
  Question.init({
    UserId: DataTypes.INTEGER,
    question: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};