'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'super',
        acceso: 'super',
        clave: 'super',
        rol: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'lider',
        acceso: 'lider',
        clave: 'lider',
        rol: 'lider',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'piso',
        acceso: 'piso',
        clave: 'piso',
        rol: 'piso',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};
