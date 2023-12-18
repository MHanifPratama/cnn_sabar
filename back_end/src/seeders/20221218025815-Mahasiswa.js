'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "mahasiswa",
      [
        {
          npm:"2017050501",
          nama_mahasiswa:"Mahasiswa Satu",
          email:"mahasiswa_satu@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          npm:"2017050501",
          nama_mahasiswa:"Mahasiswa Dua",
          email:"mahasiswa_dua@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mahasiswa', null, {});
  }
};
