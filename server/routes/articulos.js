const express = require('express');
const Articulo = require('../models/articulo');
const {verificaToken} = require('../middlewares/autenticacion');
const e = require('express');

const app = express();

// ==================
// Obtener un articulo por id
// ==================
app.get('/articulos/:id', (req, res)=>{
    // populate: usuario categoria
    let id = req.params.id;

    Articulo.findById( id, {}, {new: true})
        .exec((err, articuloDB) => {
            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if(!articuloDB){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es correcto'
                    }
                })
            }

            res.json({
                ok: true,
                articulo: articuloDB
            });
    });
});

// ==================
// Crear un articulo
// ==================
app.post('/articulos', (req, res)=>{

    let body = req.body;

    let articulo = new Articulo({
        titulo: body.titulo,
        descripcion: body.descripcion,
        precio: body.precio,
        codigoMoneda: body.codigoMoneda,
        active: body.active,
        categoria: body.categoria,
        urlImagen: body.urlImagen,
        idNegocio: body.idNegocio,
    });

    articulo.save( (err, articuloDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            message: 'Articulo creado con exito'
        });
    });
});

// ==================
// Actualizar un articulo
// ==================
app.put('/articulos/:id', (req, res)=>{
    let id = req.params.id;
    let body = req.body;

    Articulo.findById(id, (err, articuloDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!articuloDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }
    
        articuloDB.titulo = body.titulo;
        articuloDB.descripcion = body.descripcion;
        articuloDB.precio = body.precio;
        articuloDB.categoria = body.categoria;
        articuloDB.urlImagen = body.urlImagen;

        articuloDB.save( (err, articuloGuardado) => {
            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                message: 'Articulo actualizado con exito'
            });
        });
    })
});

// ==================
// Desactiva o activa un producto
// ==================
app.put('/articulos/cambiarEstado/:id', (req, res)=>{
    // modificar el campo 'disponible'
    let id = req.params.id;
    let estado = req.body.estado;
    if(!id){
        return res.status(400).json({
            ok: false,
            message: 'Debe ingresar un id'
        });
    };
    if(!estado){
        return res.status(400).json({
            ok: false,
            message: 'Debe ingresar el estado'
        });
    };

    Articulo.findById(id, (err, articuloDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!articuloDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }
        articuloDB.active = estado;
        articuloDB.save ( (err, articuloModificado) => {
            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                message: 'Articulo modiciado con exito'
            });
        });
    });
    
});

module.exports = app;