"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Mahasiswa extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         Mahasiswa.hasMany(models.Peminat, { foreignKey: "npm" });
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
