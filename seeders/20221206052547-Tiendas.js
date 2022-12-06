'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tiendas', [
      {
        nombre: 'tienda 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'tienda 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tiendas', null, {});
  }
};
