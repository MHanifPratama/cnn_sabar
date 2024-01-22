"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Ruangan extends Model {
     
      static associate(models) {
         // Define associations here
         Ruangan.hasMany(models.MataKuliah, { foreignKey: "id_ruangan", as: "matakuliahs"});
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
