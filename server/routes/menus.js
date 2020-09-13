const express = require('express');
const Articulo = require('../models/articulo');
const Negocio = require('../models/negocio');
const {verificaToken} = require('../middlewares/autenticacion');
const app = express();

// ==========================
// Obtiene todos los articulos y el negocio por id de negocio
// Servicio que utiliza para traer el menu con todos los datos necesarios en 1 solo llamado
// ==========================
app.get('/menu/:id', (req, res)=>{
    // trae todos los productos de un negocio
    let id = req.params.id;
    Negocio.findOne({ active: true, idUrl: id }, 
        'address category facebook imageBanner instagram logo name phoneLocal whatsappPhone horarios')
        .exec((err, negocioEncontrado) => {
            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if(!negocioEncontrado) {
                return res.status(500).json({
                    ok: false
                });
            }

            Articulo.find({ active: true, idNegocio: id },
                'categoria codigoMoneda descripcion precio titulo _id')
            .exec((err, articulos) => {
                if(err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
                if(!articulos.length >0){
                    return res.status(400).json({
                        ok: false,
                        message: 'No se encontraron articulos'
                    });
                }
                res.json({
                        ok: true,
                        negocio: negocioEncontrado,
                        articulos
                });  
            });
        });

});

module.exports = app;