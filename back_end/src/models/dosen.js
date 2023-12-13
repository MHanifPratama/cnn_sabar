'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dosen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dosen.hasMany(models.Pengampu, { foreignKey: "id_dosen" });

    }
  }
  Dosen.init({
    nip: DataTypes.STRING,
    nama_dosen: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dosen',
    tableName: 'dosen'
  });
  return Dosen;
};