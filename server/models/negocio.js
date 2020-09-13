const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

var negocioSchema = new Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre es necesario'] 
    },
    logo: { 
        type: String,
        required: [true, 'El logo del negocio es necesario'] 
    },
    imageBanner: { 
        type: String, 
        required: false 
    },
    category: { 
        type: String,
        required: [true, 'La categoria negocio es necesario'] 
    },
    active: { 
        type: Boolean,
        default: true 
    },
    whatsappPhone: { 
        type: String, 
        required: false 
    },
    phoneLocal: { 
        type: String, 
        required: false 
    },
    facebook: { 
        type: String, 
        required: false 
    },
    instagram: { 
        type: String, 
        required: false 
    },
    address: { 
        type: String, 
        required: false 
    },
    horarios: [{
        dayOfWeek: String,
        workingHours: [{
            startAt: { 
                type: String, 
            },
            endAt: { 
                type: String, 
            }
        }]
    }],
    idUrl: {
        type: String,
        unique: true,
        required: [true, 'El id del negocio es necesario'] 
    }
    // categoria: { 
    //     type: Schema.Types.ObjectId, ref: 'Categoria', 
    //     required: true 
    // },
    // usuario: { 
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Usuario' 
    // }
});

negocioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
})


module.exports = mongoose.model('Negocio', negocioSchema);