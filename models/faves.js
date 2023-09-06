'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Faves.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Faves.belongsTo(models.peppers, {
        foreignKey: 'pepperId'
      });
    }
  }
  Faves.init({
    userId: DataTypes.INTEGER,
    pepperId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Faves',
  });
  return Faves;
};