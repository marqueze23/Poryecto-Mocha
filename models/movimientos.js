'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movimientos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Usuarios, Tiendas, Productos, Ventas}) {
      this.belongsTo(Usuarios, {foreignKey:'idUsuario', targetKey:'id', as: 'usuario'});
      this.belongsTo(Tiendas, {foreignKey:'idTienda', targetKey:'id', as: 'tienda'});
      this.belongsTo(Productos, {foreignKey:'idProducto', targetKey:'id', as: 'producto'});

      this.belongsToMany(Ventas,{foreignKey:'idMovimiento',through:'MovimientosVenta', as:'ventas', onDelete: 'cascade'});
    }
  }
  Movimientos.init({
    idUsuario: DataTypes.INTEGER,
    idTienda: DataTypes.INTEGER,
    idProducto: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    tipo: DataTypes.ENUM('entrada', 'salida'),
    motivo: DataTypes.ENUM('ajuste', 'traspaso', 'venta')
  }, {
    sequelize,
    modelName: 'Movimientos',
  });
  return Movimientos;
};