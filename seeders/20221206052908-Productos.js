'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Productos', [
      {
        nombre: "producto 1",
        codigo: "001",
        precio: 10,
        control: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: "producto 2",
        codigo: "002",
        precio: 20,
        control: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Productos', null, {});
  }
};
