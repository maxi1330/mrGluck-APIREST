const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var articuloSchema = new Schema({
    titulo: { 
        type: String, 
        required: [true, 'El titulo es necesario'] 
    },
    descripcion: { 
        type: String, 
        required: [true, 'La descripcion es necesaria'] 
    },
    precio: { 
        type: String, 
        required: [true, 'El precio es necesario'] 
    },
    codigoMoneda: { 
        type: String, 
        required: false
    },
    active: { 
        type: Boolean,
        default: true 
    },
    categoria: { 
        type: String, 
        required: [true, 'La categoria es necesaria']  
    },
    urlImagen: { 
        type: String, 
        required: false 
    },
    idNegocio: { 
        type: String, 
        required: [true, 'Falta asignar a un negocio']  
    }
});


module.exports = mongoose.model('Articulo', articuloSchema);