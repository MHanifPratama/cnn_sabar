"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
         "users",
         [
            {
               username: "Sinta",
               email: "sinta@gmail.com",
               password: "1234",
               role: "admin",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               username: "Lala",
               email: "lala@gmail.com",
               password: "1234",
               role: "admin",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
         ],
         {}
      );
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("users", null, {});
   },
};
