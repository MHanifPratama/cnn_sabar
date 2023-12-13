"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("peminat", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         npm: {
            type: Sequelize.STRING,
            references: {
               model: "mahasiswa", // This should match the table name of 'Kelas' model
               key: "npm",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE", // Define your desired deletion behavior
         },
         id_mk: {
            type: Sequelize.INTEGER,
            references: {
               model: "matakuliah", // This should match the table name of 'Kelas' model
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE", // Define your desired deletion behavior
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
      await queryInterface.dropTable("peminat");
   },
};
