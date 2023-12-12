"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Ruangan extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // Define associations here
         Ruangan.hasMany(models.MataKuliah, { foreignKey: "id_ruangan" });
      }
   }
   Ruangan.init(
      {
         nama_ruangan: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Ruangan",
         tableName: "ruangan",
      }
   );
   return Ruangan;
};
