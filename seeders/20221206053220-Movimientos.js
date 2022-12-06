'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Movimientos', [
      {
        idUsuario: 3,
        idTienda: 1,
        idProducto: 1,
        cantidad: 1,
        tipo: 'salida',
        motivo: 'venta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idUsuario: 2,
        idTienda: 1,
        idProducto: 1,
        cantidad: 10,
        tipo: 'entrada',
        motivo: 'ajuste',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idUsuario: 2,
        idTienda: 1,
        idProducto: 1,
        cantidad: 1,
        tipo: 'salida',
        motivo: 'traspaso',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idUsuario: 2,
        idTienda: 1,
        idProducto: 1,
        cantidad: 1,
        tipo: 'entrada',
        motivo: 'traspaso',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Movimientos', null, {});
  }
};
