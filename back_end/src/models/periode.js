"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Periode extends Model {
      
      static associate(models) {
         // Define associations here
         Periode.hasMany(models.MataKuliah, { foreignKey: "id_periode" });
      }
   }
   Periode.init(
      {
         nama_periode: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Periode",
         tableName: "periode",
      }
   );
   return Periode;
};
