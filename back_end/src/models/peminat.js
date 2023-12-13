"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Peminat extends Model {
      static associate(models) {
         Peminat.belongsTo(models.Mahasiswa, { foreignKey: "npm" });
         Peminat.belongsTo(models.MataKuliah, { foreignKey: "id_mk" });
      }
   }
   Peminat.init(
      {
         npm: DataTypes.STRING,
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
