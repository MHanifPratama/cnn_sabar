"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
         "matakuliah",
         [
            {
               title: "LOGIKA",
               sks: "3",
               id_kelas: 1,
               id_periode: 1,
               id_ruangan: 1,
               jadwal: new Date("2023-12-15"),
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               title: "DDP",
               sks: "4",
               id_kelas: 2,
               id_periode: 1,
               id_ruangan: 2,
               jadwal: new Date("2023-12-17"),
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               title: "PPL",
               sks: "2",
               id_kelas: 3,
               id_periode: 2,
               id_ruangan: 3,
               jadwal: new Date("2023-12-20"),
               createdAt: new Date(),
               updatedAt: new Date(),
            },
         ],
         {}
      );
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("matakuliah", null, {});
   },
};
