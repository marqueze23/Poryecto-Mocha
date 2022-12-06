'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsuariosTienda extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsuariosTienda.init({
    idUsuario: DataTypes.INTEGER,
    idTienda: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsuariosTienda',
  });
  return UsuariosTienda;
};