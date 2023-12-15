"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Absensi extends Model {
      static associate(models) {
         Absensi.belongsTo(models.Peminat, { foreignKey: "id_peminat" });
         Absensi.belongsTo(models.Pengampu, { foreignKey: "id_pengampu" });
         Absensi.belongsTo(models.MataKuliah, { foreignKey: "id_mk" });
      }
   }
   Absensi.init(
      {
         id_peminat: DataTypes.INTEGER,
         id_pengampu: DataTypes.INTEGER,
         id_mk: DataTypes.INTEGER,
         kehadiran: DataTypes.BOOLEAN,
      },
      {
         sequelize,
         modelName: "Absensi",
         tableName: "absensi",
      }
   );
   return Absensi;
};
