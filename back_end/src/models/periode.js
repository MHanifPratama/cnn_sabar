'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Periode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Periode.init({
    nama_periode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Periode',
    tableName: 'periode',
  });
  return Periode;
};