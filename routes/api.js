const express = require('express');
const router = express.Router();

const apiClientesRouter = require('./api/clientes');
const apiAdminRouter = require('./api/admin');
const apiProductosRouter = require('./api/productos');



router.use('/clientes', apiClientesRouter);
router.use('/admin', apiAdminRouter);
router.use('/productos', apiProductosRouter);

module.exports = router;
