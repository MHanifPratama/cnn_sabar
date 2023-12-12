"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("matakuliah", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         title: {
            type: Sequelize.STRING,
         },
         sks: {
            type: Sequelize.STRING,
         },
         id_kelas: {
            type: Sequelize.INTEGER,
            references: {
               model: "kelas", // This should match the table name of 'Kelas' model
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE", // Define your desired deletion behavior
         },
         id_periode: {
            type: Sequelize.INTEGER,
            references: {
               model: "periode", // This should match the table name of 'Periode' model
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE", // Define your desired deletion behavior
         },
         id_ruangan: {
            type: Sequelize.INTEGER,
            references: {
               model: "ruangan", // This should match the table name of 'Ruangan' model
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE", // Define your desired deletion behavior
         },
         jadwal: {
            type: Sequelize.DATE,
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
      await queryInterface.dropTable("matakuliah");
   },
};
