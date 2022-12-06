'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tiendas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Usuarios, Movimientos}) {
      this.belongsToMany(Usuarios,{foreignKey:'idTienda', through:'UsuariosTienda', as:'usuarios', onDelete:'cascade'});
      this.hasMany(Movimientos,{foreignKey:'idTienda', as:'movimientos'});
    }
  }
  Tiendas.init({
    nombre: DataTypes.STRING,
    activo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Tiendas',
  });
  return Tiendas;
};