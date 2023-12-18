'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "peminat",
      [
        {
          id_mahasiswa:1,
          id_mk:2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_mahasiswa:2,
          id_mk:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('peminat', null, {});
  }
};
