const assert = require('chai').assert;
const request = require('request');
const lh = "http://localhost:3001/";

describe('Ininciando area: Productos', function(){
    it('Existen el producto 1', function(done){
        request.get({url:lh + 'productos/1'}, 
        function(err,response,body){ 
            var result = JSON.parse(body);
            assert.equal(response.statusCode, 200);
            assert.equal(result.success, true);
            assert.equal(result.producto.nombre, 'producto 1');
            done();
        });
    });
    it('Admin puede crear productos', function(done){
        request.post(
            {url:lh + 'productos',
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
    it('No-admins no pueden crear productos', function(done){
        request.post(
            {url:lh + 'productos',
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