const {Tiendas, Usuarios: mUsuarios} = require('../models');
const Usuarios = require('./usuarios');

exports.Create = async function (req, res){
    const {idSolicitante, datos} = req.body

    try{
        var valid = await Usuarios.ValidRole(idSolicitante,'admin');
        
        if(!valid){
            res.status(400).json({
                success: false,
                message: 'Error al crear nueva tienda',
                error: 'Sin permisos para realizar la accion'
            });
            return;
        }

        var result = await Tiendas.create(datos);
    }catch(err){
        res.status(400).json({
                success: false,
                message: 'Error al crear nueva tienda',
                error: {...err}
            });
        return;
    }

    res.json({
        success: true,
        tienda: result
    });
}

exports.List = async function (req, res){
    try{
        var result = await Tiendas.findAll();
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error al listar las tiendas',
            error: {...err}
        });
        return;
    }

    res.json({
        success: true,
        tiendas: result
    });
}

exports.Find = async function(req, res){
    const {idTienda} = req.params;

    try{
        var result = await Tiendas.findByPk(idTienda, {
            include: 'usuarios'
        });
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error al buscar tienda',
            error: {...err}
        });
        return;
    }

    res.json({
        success: true,
        tienda: result
    });
}

exports.Update = async function(req, res){
    const {idSolicitante, datos} = req.body;

    try{
        var valid = await Usuarios.ValidRole(idSolicitante, 'admin');

        if(!valid){
            res.status(400).json({
                success: false,
                message: 'Error al actualizar tienda',
                error: 'Sin permisos para realizar la accion'
            });
            return;
        }

        var result = await Tiendas.update(datos, {
            where: {
                id: datos.id
            }
        });

    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error al actualizar tienda',
            error: {...err}
        });
        return;
    }

    res.json({
        success: true,
        result: result
    });
}

exports.Delete = async function (req, res){
    const {idSolicitante, idTienda} = req.params;

    try{
        var valid = await Usuarios.ValidRole(idSolicitante, 'admin');

        if(!valid){
            res.status(400).json({
                success: false,
                message: 'Error al eliminar tienda',
                error: 'Sin permisos para realizar la accion'
            });
            return;
        }

        var result = await Tiendas.destroy({
            where:{
                id: idTienda
            }
        });
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error al eliminar tienda',
            error: {...err}
        });
        return;
    }

    res.json({
        success:true,
        result: result
    });
}

exports.AddUser = async function (req, res){
    const {idTienda, idUsuario, idSolicitante} = req.body

    try{
        var valid = await Usuarios.ValidRole(idSolicitante, 'lider');
        if(!valid){
             res.status(400).json({
                success: false,
                message: 'Error al agregar usuario a tienda',
                error: 'Sin permisos para realizar la accion'
            });
            return;
        }

        var tienda = await Tiendas.findByPk(idTienda);
        var usuario = await mUsuarios.findByPk(idUsuario);
        
        await tienda.addUsuarios(usuario);

        var result = await Tiendas.findByPk(idTienda, {
            include: 'usuarios'
        });
    }catch(err){
        res.status(400).json({
                success: false,
                message: 'Error al agregar usuario a tienda',
                error: {...err}
            });
        return;
    }

    res.json({
        success: true,
        result: result
    });
}

exports.RemoveUser = async function (req, res){
    const {idTienda, idUsuario, idSolicitante} = req.params

    try{
        var valid = await Usuarios.ValidRole(idSolicitante, 'lider');
        if(!valid){
             res.status(400).json({
                success: false,
                message: 'Error al retirar usuario de tienda',
                error: 'Sin permisos para realizar la accion'
            });
            return;
        }

        var tienda = await Tiendas.findByPk(idTienda);
        var usuario = await mUsuarios.findByPk(idUsuario);
        
        await tienda.removeUsuarios(usuario);

        var result = await Tiendas.findByPk(idTienda, {
            include: 'usuarios'
        });
    }catch(err){
        res.status(400).json({
                success: false,
                message: 'Error al retirar usuario de tienda',
                error: {...err}
            });
        return;
    }

    res.json({
        success: true,
        result: result
    });
}