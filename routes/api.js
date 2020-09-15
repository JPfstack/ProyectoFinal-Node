const express = require('express');
const router = express.Router();

const apiClientesRouter = require('./api/clientes');
const apiAdminRouter = require('./api/admin');
const apiProductosRouter = require('./api/productos');
const apiPedidosRouter = require('./api/pedidos');
const apiCartRouter = require('./api/cart');
const { checkToken } = require('./middlewares');



router.use('/clientes', apiClientesRouter);
router.use('/admin', apiAdminRouter);
router.use('/productos', apiProductosRouter);
router.use('/pedidos', apiPedidosRouter);
router.use('/carrito', apiCartRouter);
module.exports = router;
