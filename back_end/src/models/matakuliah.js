"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class MataKuliah extends Model {
      static associate(models) {
         MataKuliah.belongsTo(models.Kelas, { foreignKey: "id_kelas" , as: 'kelas'});
         MataKuliah.belongsTo(models.Periode, { foreignKey: "id_periode", as: 'periode'});
         MataKuliah.belongsTo(models.Ruangan, { foreignKey: "id_ruangan", as: 'ruangan'});

         MataKuliah.hasMany(models.Peminat, {
            foreignKey: "id_mk",
         });
         MataKuliah.hasMany(models.Pengampu, {
            foreignKey: "id_mk",
         });
         MataKuliah.hasMany(models.Absensi, {
            foreignKey: "id_mk",
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
         jadwal_mulai: DataTypes.DATE,
         jadwal_selesai: DataTypes.DATE,
      },
      {
         sequelize,
         modelName: "MataKuliah",
         tableName: "matakuliah",
      }
   );

   return MataKuliah;
};
