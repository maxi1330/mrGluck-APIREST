const express = require('express');
const app = express();

app.use(require('./negocios'));
app.use(require('./articulos'));
app.use(require('./menus'));

module.exports = app;