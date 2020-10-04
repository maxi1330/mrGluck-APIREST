require('./config/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//cors
app.use(cors({ origin: true }));

// parse application/json
app.use(bodyParser.json());

// habilitar la carpeta public
//app.use(express.static(path.resolve(__dirname, '../public')));

//configuracion global de rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
  }, (err, res)=> {
      if(err) throw err;
      console.log('Base de datos online');
});

mongoose.connection.on('connected', function () {
  console.log('Conectado a la base de datos: ' + process.env.URLDB)
});

mongoose.connection.on('error',function (err) {
  console.log('Error al conextar a la base de datos: ' + err)
});

mongoose.connection.on('disconnected', function () {
  console.log('Desconectado de la base de datos')
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Desconectado de la base de datos al terminar la app')
    process.exit(0)
  })
});
 
app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});
