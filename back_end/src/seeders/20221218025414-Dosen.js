'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "dosen",
      [
        {
          nip:"12345678",
          nama_dosen:"Dosen Satu",
          email:"dosen_satu@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nip:"11223344",
          nama_dosen:"Dosen Dua",
          email:"dosen_dua@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dosen', null, {});
  }
};
