const assert = require('chai').assert;
const request = require('request');
const lh = "http://localhost:3001/";

describe('Ininciando area: Movimientos', function(){
    it('Lider puede crear traspasos', function(done){
        request.post(
            {url:lh + 'movimientos/traspaso',
                headers : {
                    "content-type": "application/json",
                },
                body: {
                    'datos': {
                        'idUsuario':2,
                    }
                },
                json: true
            }, 
            function(err,response,body){ 
                assert.equal(response.statusCode, 200);
                done();
            });
    });
    it('No-lideres no pueden crear productos', function(done){
        request.post(
             {url:lh + 'movimientos/traspaso',
                headers : {
                    "content-type": "application/json",
                },
                body: {
                    'datos': {
                        'idUsuario':1,
                    }
                },
                json: true
            }, 
            function(err,response,body){ 
                assert.equal(response.statusCode, 400);
                done();
            });
    });
    it('Lider puede crear ajustes', function(done){
        request.post(
            {url:lh + 'movimientos/ajuste',
                headers : {
                    "content-type": "application/json",
                },
                body: {
                    'datos': {
                        'idUsuario':2,
                    }
                },
                json: true
            }, 
            function(err,response,body){ 
                assert.equal(response.statusCode, 200);
                done();
            });
    });
    it('No-lideres no pueden crear ajustes', function(done){
        request.post(
             {url:lh + 'movimientos/ajuste',
                headers : {
                    "content-type": "application/json",
                },
                body: {
                    'datos': {
                        'idUsuario':1,
                    }
                },
                json: true
            }, 
            function(err,response,body){ 
                assert.equal(response.statusCode, 400);
                done();
            });
    });
    it('No-admin puede crear ventas', function(done){
        request.post(
            {url:lh + 'movimientos/venta',
                headers : {
                    "content-type": "application/json",
                },
                body: {
                    'datos': {
                        'idUsuario':2,
                        'movimientos': []
                    }
                },
                json: true
            }, 
            function(err,response,body){ 
                assert.equal(response.statusCode, 200);
                done();
            });
    });
    it('Admin no pueden crear ajustes', function(done){
        request.post(
             {url:lh + 'movimientos/venta',
                headers : {
                    "content-type": "application/json",
                },
                body: {
                    'datos': {
                        'idUsuario':1,
                    }
                },
                json: true
            }, 
            function(err,response,body){ 
                assert.equal(response.statusCode, 400);
                done();
            });
    });
});