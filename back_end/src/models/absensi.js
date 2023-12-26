"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Absensi extends Model {
      static associate(models) {
         Absensi.belongsTo(models.Peminat, { foreignKey: "id_peminat" });
         Absensi.belongsTo(models.Pengampu, { foreignKey: "id_pengampu" });
         Absensi.belongsTo(models.MataKuliah, { foreignKey: "id_mk" });
      }
      static async getJadwalAbsen(jadwal,id_kelas){
         const query = `
                        SELECT
                           mhs.npm,
                           mhs.nama_mahasiswa,
                           ds.nama_dosen,
                           rng.nama_ruangan,
                           kls.nama_kelas,
                           ab.kehadiran
                        FROM
                           absensi AS ab
                           LEFT JOIN matakuliah AS mk ON ab.id_mk = mk.id
                           LEFT JOIN peminat AS pmt ON ab.id_peminat = pmt.id
                           LEFT JOIN mahasiswa AS mhs ON pmt.id_mahasiswa = mhs.id
                           LEFT JOIN pengampu AS pmu ON ab.id_pengampu = pmu.id
                           LEFT JOIN dosen AS ds ON pmu.id_dosen = ds.id
                           LEFT JOIN ruangan AS rng ON mk.id_ruangan = rng.id
                           LEFT JOIN kelas AS kls ON mk.id_kelas = kls.id
                        WHERE
                           :jadwal BETWEEN mk.jadwal_mulai AND mk.jadwal_selesai
                           and kls.id = :id_kelas;
                     `;
         const result = await sequelize.query(
            query,
            {
               replacements: { jadwal: jadwal,id_kelas:id_kelas },
               type: sequelize.QueryTypes.SELECT,
            })
         return result
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
