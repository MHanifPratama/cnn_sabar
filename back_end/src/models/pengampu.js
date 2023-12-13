"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Pengampu extends Model {
      static associate(models) {
         Pengampu.belongsTo(models.Dosen, { foreignKey: "id_dosen" });
         Pengampu.belongsTo(models.MataKuliah, { foreignKey: "id_mk" });
      }
   }
   Pengampu.init(
      {
         id_dosen: DataTypes.INTEGER,
         id_mk: DataTypes.INTEGER,
      },
      {
         sequelize,
         modelName: "Pengampu",
         tableName: "pengampu",
      }
   );
   return Pengampu;
};
