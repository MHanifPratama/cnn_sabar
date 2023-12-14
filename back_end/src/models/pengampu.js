"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Pengampu extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Pengampu.belongsTo(models.Dosen, { foreignKey: "id_dosen" });
         Pengampu.belongsTo(models.MataKuliah, { foreignKey: "id_mk" });
         Pengampu.hasMany(models.Absensi, {
            foreignKey: "id_pengampu",
         });
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
