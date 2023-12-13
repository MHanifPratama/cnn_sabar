"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
         "periode",
         [
            {
               nama_periode: "2021/2022",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               nama_periode: "2022/2023",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               nama_periode: "2023/2024",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
         ],
         {}
      );
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("periode", null, {});
   },
};
