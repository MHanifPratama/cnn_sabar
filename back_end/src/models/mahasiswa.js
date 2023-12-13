"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Mahasiswa extends Model {
      
      static associate(models) {
         Mahasiswa.hasMany(models.Peminat, { foreignKey: "id_mahasiswa" });
      }
   }
   Mahasiswa.init(
      {
         npm: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
         },
         nama_mahasiswa: DataTypes.STRING,
         email: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "Mahasiswa",
         tableName: "mahasiswa",
      }
   );
   return Mahasiswa;
};
