const express = require('express');
const router = express.Router();

const apiClientesRouter = require('./api/clientes');
const apiAdminRouter = require('./api/admin');
const apiProductosRouter = require('./api/productos');
<<<<<<< HEAD
const apiPedidosRouter = require('./api/pedidos');
=======
const { checkToken } = require('./middlewares');

>>>>>>> b77dc4bc33e41772fcba0a17d9424f1c9aaf035a


router.use('/clientes', apiClientesRouter);
router.use('/admin', apiAdminRouter);
router.use('/productos', apiProductosRouter);
router.use('/pedidos', apiPedidosRouter);
module.exports = router;
