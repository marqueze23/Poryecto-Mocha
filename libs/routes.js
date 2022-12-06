const express = require('express');
const router = express.Router();
const Usuarios = require('../controllers/usuarios');
const Tiendas = require('../controllers/tiendas');
const Productos = require('../controllers/productos');
const Movimientos = require('../controllers/movimientos');

const logRequest = (req, res, next) => {
  console.log(req.url, req.query, req.params, req.body);
  next();
}

const route = (endpoint, handler, method) => {
  if (method === 'GET'){
    return router.get(endpoint, logRequest, handler);
  }
  if (method === 'POST'){
    return router.post(endpoint, logRequest, handler);
  }
  if (method === 'PUT'){
    return router.put(endpoint, logRequest, handler);
  }
  if (method === 'DELETE'){
    return router.delete(endpoint, logRequest, handler);
  }

  return router.get(endpoint, logRequest, handler);
};


route('/usuarios', Usuarios.List, 'GET');
route('/usuarios', Usuarios.Create, 'POST');
route('/usuarios/:idUsuario', Usuarios.Find, 'GET');
route('/usuarios/login', Usuarios.Find, 'POST');
route('/usuarios', Usuarios.Update, 'PUT');
route('/usuarios/:idSolicitante/:idUsuario', Usuarios.Delete, 'DELETE');

route('/tiendas', Tiendas.List, 'GET');
route('/tiendas', Tiendas.Create, 'POST');
route('/tiendas/:idTienda', Tiendas.Find, 'GET');
route('/tiendas', Tiendas.Update, 'PUT');
route('/tiendas/:idSolicitante/:idTienda', Tiendas.Delete, 'DELETE');
route('/tiendas/usuarios', Tiendas.AddUser, 'POST');
route('/tiendas/usuarios/:idSolicitante/:idTienda/:idUsuario', Tiendas.RemoveUser, 'DELETE');

route('/productos', Productos.List, 'GET');
route('/productos', Productos.Create, 'POST');
route('/productos/:idProducto', Productos.Find, 'GET');
route('/productos', Productos.Update, 'PUT');
route('/productos/:idSolicitante/:idProducto', Productos.Delete, 'DELETE');

route('/movimientos/ajuste', Movimientos.Adjustment, 'POST');
route('/movimientos/traspaso' , Movimientos.Transfer, 'POST');
route('/movimientos/venta', Movimientos.Sale, 'POST');
route('/movimientos/venta/:idVenta', Movimientos.SaleReport, 'GET');
route('/movimientos/venta/tienda/:idTienda', Movimientos.SaleReporByStore, 'GET');

module.exports = router;