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
               jadwal_mulai: new Date('2023-12-25T12:00:00'),
               jadwal_selesai: new Date('2023-12-26T15:30:00'),
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               title: "DDP",
               sks: "4",
               id_kelas: 2,
               id_periode: 1,
               id_ruangan: 2,
               jadwal_mulai: new Date('2023-12-27T12:00:00'),
               jadwal_selesai: new Date('2023-12-28T15:30:00'),
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               title: "PPL",
               sks: "2",
               id_kelas: 3,
               id_periode: 2,
               id_ruangan: 3,
               jadwal_mulai: new Date('2023-12-29T12:00:00'),
               jadwal_selesai: new Date('2023-12-30T15:30:00'),
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
