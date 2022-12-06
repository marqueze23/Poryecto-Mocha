const crypto = require('crypto');
const cUsuarios = require('./usuarios');
const {Movimientos, Ventas} = require('../models');

exports.Adjustment = async function(req, res){
    const {datos} = req.body;

    try{
        var valid = await cUsuarios.ValidRole(datos.idUsuario,'lider');

        if(!valid){
            res.status(400).json({
                success: false,
                message: 'Error al crear movimiento:ajuste',
                error: 'Sin permisos para realizar la accion'
            });
            return;
        }

        var result = await Movimientos.create({
            idUsuario: datos.idUsuario,
            idTienda: datos.idTienda,
            idProducto: datos.idProducto,
            cantidad: datos.cantidad,
            tipo: datos.tipo,
            motivo: 'ajuste'
        });

    }catch(e){
        res.status(400).json({
            success: false,
            message: 'Error al crear movimiento:ajuste',
            error: {...e}
        });
        return;
    }

    res.json({
        success: true,
        movimiento: result
    });
}

exports.Transfer = async function(req, res){
    const {datos} = req.body;

    try{
        var valid = await cUsuarios.ValidRole(datos.idUsuario,'lider');

        if(!valid){
            res.status(400).json({
                success: false,
                message: 'Error al crear movimiento:traspaso',
                error: 'Sin permisos para realizar la accion'
            });
            return;
        }

        var envia = await Movimientos.create({
            idUsuario: datos.idUsuario,
            idTienda: datos.idTiendaEnvia,
            idProducto: datos.idProducto,
            cantidad: datos.cantidad,
            tipo: 'salida',
            motivo: 'traspaso'
        });

        var recibe = await Movimientos.create({
            idUsuario: datos.idUsuario,
            idTienda: datos.idTiendaEnvia,
            idProducto: datos.idProducto,
            cantidad: datos.cantidad,
            tipo: 'entrada',
            motivo: 'traspaso'
        });

    }catch(e){
        res.status(400).json({
            success: false,
            message: 'Error al crear movimiento:traspaso',
            error: {...e}
        });
        return;
    }

    res.json({
        success: true,
        resltados: {
            envio: envia,
            recepcion: recibe
        }
    });
}

exports.Sale = async function(req, res){
    const {datos} = req.body;

    try{
        var isAdmin = await cUsuarios.ValidRole(datos.idUsuario, 'admin');

        if(isAdmin){
            res.status(400).json({
                success: false,
                message: 'Error al crear movimiento:venta',
                error: 'Sin permisos para realizar la accion'
            });
            return;
        }

        var venta = await Ventas.create({
            folio: crypto.randomUUID()
        });

        var movimientos = await Movimientos.bulkCreate(datos.movimientos);

        venta.addMovimientos(movimientos);

    } catch(e){
        res.status(400).json({
            success: false,
            message: 'Error al crear movimiento:venta',
            error: {...e}
        });
        return;
    }

    res.json({
        success: true,
        venta : venta,
        movimientos: movimientos
    });
}

exports.SaleReport = async function(req, res){
    const {idVenta} = req.params;

    try{
        var result = await Ventas.findByPk(idVenta, {
            include: 'movimientos'
        });
    } catch(e){
        res.status(400).json({
            success: false,
            message: 'Error al listar movimiento:venta',
            error: {...e}
        });
        return;
    }

    res.json({
        success: true,
        venta : result,
    });
}

exports.SaleReporByStore = async function(req, res){
    const {idTienda} = req.params;

    try{
        var result = await Ventas.findAll({
            include: [{
                model: Movimientos,
                as: 'movimientos',
                where: {
                    idTienda: idTienda
                }
            }]
        });
    } catch(e){
        res.status(400).json({
            success: false,
            message: 'Error al listar movimiento:ventasTienda',
            error: {...e}
        });
        return;
    }

    res.json({
        success: true,
        ventas : result,
    });
}
