"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class MataKuliah extends Model {
      static associate(models) {
         MataKuliah.belongsTo(models.Kelas, { foreignKey: "id_kelas" });
         MataKuliah.belongsTo(models.Periode, { foreignKey: "id_periode" });
         MataKuliah.belongsTo(models.Ruangan, { foreignKey: "id_ruangan" });
         MataKuliah.hasMany(models.Mahasiswa, {
            foreignKey: "npm",
         });
      }
   }
   MataKuliah.init(
      {
         title: DataTypes.STRING,
         sks: DataTypes.STRING,
         id_kelas: DataTypes.INTEGER,
         id_periode: DataTypes.INTEGER,
         id_ruangan: DataTypes.INTEGER,
         jadwal: DataTypes.DATE,
      },
      {
         sequelize,
         modelName: "MataKuliah",
         tableName: "matakuliah",
      }
   );

   return MataKuliah;
};
