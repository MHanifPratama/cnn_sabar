"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
         "kelas",
         [
            {
               nama_kelas: "A 2020",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               nama_kelas: "A 2022",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               nama_kelas: "C 2023",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
         ],
         {}
      );
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("kelas", null, {});
   },
};
