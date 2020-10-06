const express = require('express');
const Negocio = require('../models/negocio');

const app = express();

const PAGE_SIZE_DEFAULT = 20;

// ==========================
// Obtener negocio por Id
// ==========================
app.get('/negocio/:id', (req, res)=>{
    // trae todos los productos
    // populate: usuario categoria
    let idNegocio = req.params.id;
    
    Negocio.find({ active: true, idUrl: idNegocio }, 
        'name logo imageBanner category whatsappPhone phoneLocal facebook instagram address idUrl horarios')
        .exec((err, negocio) => {
            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if(!negocio.length > 0){
                return res.status(400).json({
                    ok: false,
                    message: 'No se encontro el negocio'
                });
            }

            res.json({
                    ok: true,
                    negocio
            });  
        });
});

// ==========================
// Crear un negocio
// ==========================

app.post('/negocio', (req, res) => {
    let body = req.body;
    
    let negocio = new Negocio ({
        name: body.name,
        logo: body.logo,
        imageBanner: body.imageBanner,
        category: body.category,
        whatsappPhone: body.whatsappPhone,
        phoneLocal: body.phoneLocal,
        facebook: body.facebook,
        instagram: body.instagram,
        address: body.address,
        idUrl: body.idUrl,
        horarios: [{"dayOfWeek": "MONDAY","workingHours":[{"startAt": "10:00","endAt": "14:00"},{"startAt": "19:00","endAt": "23:00"}]},{"dayOfWeek": "TUESDAY","workingHours":[{"startAt": "10:00","endAt": "14:00"},{"startAt": "19:00","endAt": "23:00"}]},{"dayOfWeek": "WEDNESDAY","workingHours":[{"startAt": "10:00","endAt": "14:00"},{"startAt": "19:00","endAt": "23:00"}]},{"dayOfWeek": "THURSDAY","workingHours":[{"startAt": "10:00","endAt": "14:00"},{"startAt": "19:00","endAt": "23:00"}]},{"dayOfWeek": "FRIDAY","workingHours":[{"startAt": "10:00","endAt": "14:00"},{"startAt": "19:00","endAt": "23:00"}]},{"dayOfWeek": "SATURDAY","workingHours":[{"startAt": "10:00","endAt": "14:00"}]},{"dayOfWeek": "SUNDAY","workingHours":[{"startAt": "10:00","endAt": "14:00"}]}]
    });
    
    negocio.save( (err,negocioDB) => {
        console.log(err);
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        
        if(!negocioDB){
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            message: 'Negocio creado con exito'
        });
    });
});

// ==========================
// Obtener un negocio filtrado por nombre y paginado
// /negocio/search?page=0&filter=coso&limit=10 --> todos son opcionales
// ==========================

app.get('/search/negocio', (req, res)=>{

    let page = req.query.page || 1;
    page = Number(page);

    let limit = req.query.limit || PAGE_SIZE_DEFAULT;
    limit = Number(limit);

    const skip = (page -1) * PAGE_SIZE_DEFAULT;

    let filter = req.query.filter || "";
    let regex = new RegExp(filter, 'i');

    Negocio.find({ active: true, name: regex }, 
        'name logo imageBanner category whatsappPhone phoneLocal facebook instagram address idUrl horarios')
        .skip(skip)
        .limit(limit)
        .exec((err, negocios) => {
            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if(!negocios.length > 0){
                return res.status(400).json({
                    ok: false,
                    message: 'No se encontraron negocios'
                });
            }

            res.json({
                    ok: true,
                    negocios
            });  
        });
});

module.exports = app;