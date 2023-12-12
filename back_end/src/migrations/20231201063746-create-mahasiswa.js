"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("mahasiswa", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         npm: {
            type: Sequelize.STRING,
         },
         nama_mahasiswa: {
            type: Sequelize.STRING,
         },
         email: {
            type: Sequelize.STRING,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("mahasiswa");
   },
};
