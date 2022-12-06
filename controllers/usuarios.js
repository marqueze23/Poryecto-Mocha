const {Usuarios} = require('../models');

exports.Create = async function(req, res){
    const {idSolicitante, usuario} = req.body;
    
    try{
        var valid = await ValidRole(idSolicitante,'admin');

        if(!valid){
            res.status(400).json({
                success: false,
                message: 'Error al crear usuario',
                error: 'Sin permisos para realizar la accion'
            });
            return;
        }

        var result = await Usuarios.create(usuario);
    }catch(err){
        res.status(400).json({
            success:false,
            message: 'Error al crear el usuario',
            error: {...err},
        });
        return;
    }

    res.json({
        success: true,
        message: 'Usuarios creado exitosamente',
        usuario: result,
    });
}

exports.List = async function(req, res){
    try{
        var result = await Usuarios.findAll();
    }catch(err){
        res.status(400).json({
            success:false,
            message: 'Error al listar los usuarios',
            error: {...err}
        });
        return;
    }

    res.json({
        success: true,
        usuarios: result,
    });
}

exports.Find = async function(req, res){
    const {logInfo} = req.body;
    const {idUsuario} = req.params;
    var result = undefined;

    try{
        if(logInfo !== undefined){
            result = await FindByLogin(logInfo);
        }else{
            result = await FindById(idUsuario);
        }
        
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error al buscar el usuario',
            error: {...err}
        });
        return;
    }

    res.json({
        success: true,
        usuario: result
    });
}

exports.Update = async function(req, res){
    const {idUsuario, datos} = req.body;

    try{
        var valid = await ValidRole(idUsuario,'admin');

        if(!valid){
            res.status(400).json({
                success: false,
                message: 'Error al actualizar usuario',
                error: 'Sin permisos para realizar la accion'
            });
            return;
        }

        var result = await Usuarios.update(datos, {
            where: {
                id: datos.id
            }
        });
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error al actualizar el usuario',
            error: {...err}
        });
        return;
    }

    res.json({
        success: true,
        usuario: result
    })
}

exports.Delete = async function(req, res){
    const {idSolicitante, idUsuario} = req.params;

    if(idSolicitante === idUsuario){
        res.status(400).json({
                success: false,
                message: 'Error al eliminar el usuario',
                error: 'El usuario no se puede eliminar a si mismo'
            });
        return;   
    }

    try{

         var valid = await ValidRole(idSolicitante,'admin');

        if(!valid){
            res.status(400).json({
                success: false,
                message: 'Error al eliminar usuario',
                error: 'Sin permisos para realizar la accion'
            });
            return;
        }

        var result = await Usuarios.destroy({
            where: {
                id: idUsuario
            }
        });
    }catch(err){
        res.status(400).json({
            success: false,
            message: 'Error al eliminar el usuario',
            error: {...err}
        });
        return;
    }

    res.json({
        success: true,
        result: result
    })
}

exports.ValidRole = ValidRole;

async function ValidRole (id,rol){
    var usuarioSolicitante = await FindById(id);
    return usuarioSolicitante.rol === rol
}

async function FindById (id){
    return await Usuarios.findByPk(id);
} 

async function FindByLogin (info){
    return await Usuarios.findOne({
        where: {
            acceso: info.acceso,
            clave: info.clave
        }
    })
}