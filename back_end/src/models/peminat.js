"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Peminat extends Model {
      static associate(models) {
         Peminat.belongsTo(models.Mahasiswa, { foreignKey: "id_mahasiswa" });
         Peminat.belongsTo(models.MataKuliah, { foreignKey: "id_mk" });
      }
   }
   Peminat.init(
      {
         id_mahasiswa: DataTypes.INTEGER,
         id_mk: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: "Peminat",
         tableName: "peminat",
      }
   );
   return Peminat;
};
