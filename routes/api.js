const express = require('express');
const router = express.Router();

const apiClientesRouter = require('./api/clientes');
const apiAdminRouter = require('./api/admin');
const apiProductosRouter = require('./api/productos');
const apiPedidosRouter = require('./api/pedidos');


router.use('/clientes', apiClientesRouter);
router.use('/admin', apiAdminRouter);
router.use('/productos', apiProductosRouter);
router.use('/pedidos', apiPedidosRouter);
module.exports = router;
