'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UsuariosTiendas', [
      {
        idUsuario: 2,
        idTienda: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idUsuario: 3,
        idTienda: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UsuariosTiendas', null, {});
  }
};
