'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = require('../data.json');
    data = data.map(el => {
      let { username, birthDate, email } = el;
      let createdAt = new Date();
      let updatedAt = new Date();
      birthDate = new Date(birthDate);
      return { username, birthDate, email, createdAt, updatedAt };
    });
    await queryInterface.bulkInsert('Users', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
