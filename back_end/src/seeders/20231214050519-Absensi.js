"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
         "absensi",
         [
            {
               id_peminat: 2,
               id_pengampu: 1,
               id_mk: 1,
               kehadiran: true,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
         ],
         {}
      );
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("absensi", null, {});
   },
};
