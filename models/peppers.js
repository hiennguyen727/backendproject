'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class peppers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  peppers.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    heat: DataTypes.STRING,
    origin: DataTypes.STRING,
    colors: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'peppers',
  });
  return peppers;
};