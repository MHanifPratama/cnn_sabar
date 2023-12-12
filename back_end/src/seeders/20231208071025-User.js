"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      const hashedPassword = await bcrypt.hash("1234", 10); // Hash password "1234"

      await queryInterface.bulkInsert(
         "users",
         [
            {
               username: "Sinta",
               email: "sinta@gmail.com",
               password: hashedPassword, // Gunakan password yang sudah di-hash
               role: "admin",
               createdAt: new Date(),
               updatedAt: new Date(),
            },
            {
               username: "Lala",
               email: "lala@gmail.com",
               password: hashedPassword, // Gunakan password yang sudah di-hash
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
