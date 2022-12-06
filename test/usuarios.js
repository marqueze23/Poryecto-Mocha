const assert = require('chai').assert;
const request = require('request');
const lh = "http://localhost:3001/";

describe('Ininciando area: Usuarios', function(){
    it('Existe el usuario super', function(done){
        request.get({url:lh + 'usuarios/1'}, 
        function(err,response,body){ 
            var result = JSON.parse(body);
            assert.equal(response.statusCode, 200);
            assert.equal(result.success, true);
            assert.isObject(result.usuario);
            assert.equal(result.usuario.nombre, 'super');
            done();
        });
    });
    it('Admin puede crear usuarios', function(done){
        request.post(
            {url:lh + 'usuarios',
                headers : {
                    "content-type": "application/json",
                },
                body: {
                    'idSolicitante':1,
                },
                json: true
            }, 
            function(err,response,body){ 
                assert.equal(response.statusCode, 200);
                done();
            });
    });
    it('No-admins no pueden crear usuarios', function(done){
        request.post(
            {url:lh + 'usuarios',
                headers : {
                    "content-type": "application/json",
                },
                body: {
                    'idSolicitante':2,
                },
                json: true
            }, 
            function(err,response,body){ 
                assert.equal(response.statusCode, 400);
                done();
            });
    });

});