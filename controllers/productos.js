const cUsuarios = require('./usuarios');
const {Productos} = require('../models');

exports.Create = async function (req,res){
    const{idSolicitante, datos} = req.body;

    try{
        var valid = await cUsuarios.ValidRole(idSolicitante,'admin');

        if(!valid){
            res.status(400).json({
                success: false,
                message: 'Error al crear producto',
                error: 'Sin permisos para realizar la accion'
            });
            return;
        }

        var result = await Productos.create(datos);
    }catch(e){
        res.status(400).json({
                success: false,
                message: 'Error al crear producto',
                error: {...e}
            });
            return;
    }

    res.json({
        success: true,
        producto: result,
    });
}

exports.List = async function (req, res){
    try{
        var result = await Productos.findAll();
    }catch(e){
        res.status(400).json({
                success: false,
                message: 'Error al listar productos',
                error: {...e}
            });
            return;
    }

    res.json({
        success:true,
        productos: result
    });
}

exports.Find = async function(req, res){
    const {idProducto} = req.params;

    try{
        var result = await Productos.findByPk(idProducto, {
            include: 'movimientos'
        });
    }catch(e){
        res.status(400).json({
                success: false,
                message: 'Error al buscar producto',
                error: {...e}
            });
            return;
    }
     
    res.json({
        success:true,
        producto: result
    });
}

exports.Update = async function(req,res){
    const{idSolicitante, datos} = req.body;

    try{
        var valid = await cUsuarios.ValidRole(idSolicitante, 'admin');

        if(!valid){
            res.status(400).json({
                success: false,
                message: 'Error al actualizar producto',
                error: 'Sin permisos para realizar la accion'
            });
            return;
        }

        var result = await Productos.update(datos, {
            where: {
                id: datos.id
            }
        });
    }catch(e){
        res.status(400).json({
            success: false,
            message: 'Error al crear producto',
            error: {...e}
        });
        return;
    }

    res.json({
        success: true,
        result: result
    });
}

exports.Delete = async function(req,res){
    const{idSolicitante, idProducto} = req.params;

    try{
        var valid = await cUsuarios.ValidRole(idSolicitante, 'admin');

        if(!valid){
            res.status(400).json({
                success: false,
                message: 'Error al eliminar producto',
                error: 'Sin permisos para realizar la accion'
            });
            return;
        }

        var result = await Productos.destroy({
            where:{
                id: idProducto
            }
        });
    }catch(e){
        res.status(400).json({
            success: false,
            message: 'Error al eliminar producto',
            error: {...e}
        });
        return;
    }

    res.json({
        success: true,
        result: result
    });
}