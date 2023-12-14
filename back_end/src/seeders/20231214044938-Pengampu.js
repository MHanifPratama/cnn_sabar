"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
         "pengampu",
         [
            {
               id_dosen: 1,
               id_mk: 8,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               id_dosen: 1,
               id_mk: 8,
               createdAt: new Date(),
               updatedAt: new Date(),
            },
         ],
         {}
      );
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("pengampu", null, {});
   },
};
