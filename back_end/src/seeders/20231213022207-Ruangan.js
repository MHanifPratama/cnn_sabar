"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
         "ruangan",
         [
            {
               nama_ruangan: "LAB RPL",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               nama_ruangan: "MIPA TL1A",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               nama_ruangan: "GIK L1C",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               nama_ruangan: "GIK L2",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
         ],
         {}
      );
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("ruangan", null, {});
   },
};
