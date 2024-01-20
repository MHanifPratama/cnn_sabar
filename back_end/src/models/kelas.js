"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Kelas extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // Define associations here
         Kelas.hasMany(models.MataKuliah, { foreignKey: "id_kelas" , as: 'matakuliahs' });
      }
   }
   Kelas.init(
      {
         nama_kelas: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Kelas",
         tableName: "kelas",
      }
   );
   return Kelas;
};
